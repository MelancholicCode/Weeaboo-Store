'use client';

import { Popup } from '../Popup/Popup';
import { Typography } from '../Typography/Typography';
import { useQueryParams } from '@/shared/hooks/useQueryParams';

export const NotActivatedPopup = () => {
  const query = useQueryParams();

  const handleClosePopup = () => {
    if (query.has('not_activated')) {
      query.remove('not_activated');
    }
  };

  return (
    <Popup
      title="The account is not activated"
      isOpen={query.has('not_activated')}
      onRequestClose={handleClosePopup}
    >
      <Typography variant="body-1">
        Your account has not been activated yet. Check your email and follow the
        link from the email to activate your account and use the store.
      </Typography>
    </Popup>
  );
};
