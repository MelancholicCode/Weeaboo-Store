import { NextResponse, NextRequest } from 'next/server';
import { routes } from './constants/routes';
import { IUser } from './shared/types/user.interface';
import { RolesEnum } from './shared/types/role.interface';
import { TokensEnum } from './services/auth/auth.types';

export const middleware = async (request: NextRequest) => {
  const refreshToken = request.cookies.get(TokensEnum.REFRESH_TOKEN)?.value;

  if (!refreshToken) {
    if (!request.url.includes(routes.AUTH)) {
      return NextResponse.redirect(new URL(routes.AUTH, request.url));
    }
    return NextResponse.next();
  }

  try {
    const tokensResponse = await fetch(
      `${process.env.API_URL}/auth/login/tokens`,
      {
        headers: {
          Cookie: `refreshToken=${refreshToken}`,
        },
      }
    );

    if (!tokensResponse.ok) {
      throw new Error();
    }

    // Redirect authorized user
    if (request.url.includes(routes.AUTH)) {
      return NextResponse.redirect(
        new URL(routes.authUserRoutes.ACCOUNT, request.url)
      );
    }

    // Check ADMIN role
    if (request.url.includes(routes.adminRoutes.ADMIN)) {
      const data: IUser = await tokensResponse.json();

      if (data.roles.some((role) => role.name === RolesEnum.ADMIN)) {
        return NextResponse.next();
      }

      return NextResponse.rewrite(new URL(routes.NOT_FOUND, request.url));
    }

    const response = NextResponse.next();

    tokensResponse.headers
      .getSetCookie()
      .forEach((item) => response.headers.set('Set-Cookie', item));

    return response;
  } catch {
    const response = request.url.includes(routes.AUTH)
      ? NextResponse.next()
      : NextResponse.redirect(new URL(routes.AUTH, request.url));

    response.cookies.delete(TokensEnum.ACCESS_TOKEN);
    response.cookies.delete(TokensEnum.REFRESH_TOKEN);

    return response;
  }
};

export const config = {
  matcher: ['/auth', '/account/:path*', '/admin/:path*'],
};
