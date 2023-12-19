import { faker } from '@faker-js/faker';
import { PrismaClient, Product } from '@prisma/client';

const prisma = new PrismaClient();

export const seedProducts = async (): Promise<Product[]> => {
  try {
    const productsData = [
      {
        title: 'Chainsaw Man, Vol. 1',
        description:
          'Denji was a small-time devil hunter just trying to survive in a harsh world. After being killed on a job, he is revived by his pet devil Pochita and becomes something new and dangerous—Chainsaw Man!',
        price: 6.02,
        slug: 'chainsaw-man-vol-1',
        img: faker.image.urlLoremFlickr(),
        categoryId: 4,
      },
      {
        title:
          'Eye coffret 1day UV 【Color Contacts/1 Day/Prescription, No Prescription/10Lenses】',
        description:
          'Brand Name: Eye coffret\nSeries name: 1day UV\nImage Model: Keiko Kitagawa\n\nCOLOR VARIATION\n[Base make (Light brown)]\nEyes gently fit naturally, also for the first time of the circle lens.\n\n[Natural make (Black)]\nDignified intelligent pupil, lively and natural full of women.\n\n[Rich make (Brown)]\nHitomi decorate the ornate is, what kind of expression is also elegant.\n\n[Grace make (Gray)] ※ New\nElegant adult pupil, striking beauty and shine.',
        price: 13.63,
        slug: 'eye-coffret-1day-uv',
        img: faker.image.urlLoremFlickr(),
        categoryId: 2,
      },
      {
        title: 'Sarasaty Lingerie Detergent',
        description:
          "Sarasaty Lingerie Detergent is very effective at cleaning out dirt and blood from fabrics. Leave them to soak for about 20 minutes, and you won't even need to scrub. Easy to use one-touch cap.",
        price: 1.99,
        slug: 'sarasaty-lingerie-detergent',
        img: faker.image.urlLoremFlickr(),
        categoryId: 5,
      },
      {
        title: 'Yaokin bag input Strawberry Daifuku 32 pieces',
        description:
          'Fluffy texture of marshmallow has brings out the strawberry cream.',
        price: 9.09,
        slug: 'yaokin-bag-input-strawberry-daifuku-32-pieces',
        img: faker.image.urlLoremFlickr(),
        categoryId: 1,
      },

      {
        title:
          'Silcot "Uruuru Cotton" Sponge Touch Moisturizing Cotton (40 Sheets x 5 Boxes)',
        description:
          'Silcot "Uruuru Cotton" Sponge Touch Moisturizing Cotton delivers moisture to the skin with only half the usual amount of lotion. The newly developed spongy material sends all the contained lotion to the skin, so when used for patting or masking, only half the usual amount of lotion is required. The smooth texture adheres to the skin well so it can also be used as a facial mask. Contains moisturizing ingredients that gives a smooth, lush finish to the skin. With an extra smooth texture, it is very gentle on the skin.',
        price: 6.25,
        slug: 'silcot-uruuru-cotton-sponge-touch-moisturizing-cotton-40-sheets-x-5-boxes',
        img: faker.image.urlLoremFlickr(),
        categoryId: 2,
      },
      {
        title: 'Taste source Mos Burger potato Teriyakibaga flavor 50g',
        description:
          'Mos Burger reproduce the taste of Teriyakibaga is originated in the potato stick. Deep flavor of Mos Burger of the secret of teriyaki source and mayonnaise acidity is so close to the taste of Teriyakibaga that match, the miso in addition to the secret ingredient, and finished with a taste that is full-bodied.',
        price: 1.42,
        slug: 'taste-source-mos-burger-potato-teriyakibaga-flavor-50g',
        img: faker.image.urlLoremFlickr(),
        categoryId: 1,
      },
      {
        title:
          'Fujifilm FUJIFILM instant color film instax mini [cheki film 20 sheets to take 10 pieces 2 pack]',
        description:
          'Film size: 86 x 54mm screen size: 62 x 46mmISO sensitivity: ISO800 number: instant color film for 20-exposure 10 pieces 2 pack instax mini.',
        price: 23.96,
        slug: 'fujifilm-fujifilm-instant-color-film-instax-mini-cheki-film-20-sheets-to-take-10-pieces-2-pack',
        img: faker.image.urlLoremFlickr(),
        categoryId: 3,
      },
      {
        title: 'Kit Kat Mini - Dark Matcha Green Tea (12 Bars)',
        description:
          'With double the Uji Matcha as original Green Tea Kit Kats, this refined version has a sharp, deep flavor and leaves behind a rich, bitter aftertaste.\nBy incorporating a little bit of catechin-rich Matcha Green Tea in your life every day, you can escape the hustle and bustle of busy life. Stop to catch your breath and and have a break with a Dark Green Tea Kit Kat.',
        price: 3.44,
        slug: 'kit-kat-mini',
        img: faker.image.urlLoremFlickr(),
        categoryId: 1,
      },
      {
        title: 'New crisis hot water alum carbonate hot water 30g',
        description:
          'Onsen-derived components (alum addition + carbonic acid gas), to enhance the warm bath effect to improve blood flow, tightening the skin, and improves the blood flow to the limbs.',
        price: 0.57,
        slug: 'new-crisis-hot-water-alum-carbonate-hot-water-30g',
        img: faker.image.urlLoremFlickr(),
        categoryId: 5,
      },
      {
        title:
          'Seam Respiter Cold water cylinder 3.0L hot water made in Japan K-1287W 1 piece Iwasaki Kogyo',
        description:
          'Packing and lid -integrated pitcher, which does not require cleaning packing and packing grooves that are troublesome when cleaning. There is no step at the border between the lid and the packing, it can be washed quickly with a sponge, and it is easy to clean. Not only can it be stored in the door pocket or vegetable room in the refrigerator, but it can also be placed sideways, so there is no problem with the storage space. The handle design and grip that are easy to hold and take out, so you can take out smoothly and without stress. It can be easily opened and closed with one hand, so it is a design that is friendly to people with small hands. It is OK to pour boiling water.\nHeat resistance 100 ° C, cool-resistant -20 ° C',
        price: 15.62,
        slug: 'seam-respiter-cold-water',
        img: faker.image.urlLoremFlickr(),
        categoryId: 5,
      },
      {
        title:
          'Fujifilm FUJIFILM Cheki EVO Hybrid Instant Camera Brown Brown INS Mini Evo Brown',
        description:
          'Compatible with the card size "mini -format film".\n・ 10 types of lens effects and 10 types of film effects are possible with up to 100 shooting effects.\n・ There is a sense of luxury with a classic design. It features a lens dial, a film dial, and a print lever that can enjoy the analog operation feeling.\n・ In cooperation with a dedicated app, it is easy to print smartphone photos and SNS sharing.',
        price: 239.98,
        slug: 'fujifilm-fujifilm-cheki-evo-hybrid-instant-camera-brown-brown-ins-mini-evo-brown',
        img: faker.image.urlLoremFlickr(),
        categoryId: 3,
      },
      {
        title: 'Kiyo pyrethrum Hello Kitty cool soft pillow jumbo',
        description:
          '● is a convenient ice pillow to sudden fever\n● will help you, such as when unable to sleep well\n● is a gel type which is not hard',
        price: 9.8,
        slug: 'kiyo-pyrethrum-hello-kitty-cool-soft-pillow-jumbo',
        img: faker.image.urlLoremFlickr(),
        categoryId: 5,
      },
      {
        title: 'Nagatanien adult sprinkled mini Part 2 (20 bags)',
        description:
          'Was an assortment of different flavor, it is sprinkled perfect to accompany the day-to-day rice and lunch. Menu, firmly taste the taste of salmon and seaweed "salmon seaweed", the refreshing acidity of the combined plum and shiso "Yukari Ume", slightly sweet taste of bonito can enjoy "and you mirin", moderate spicy of " roe ", 5 kinds of flavor of chicken were together in the sweetness of miso" meat miso ". Different taste you can enjoy every day.',
        price: 6.23,
        slug: 'nagatanien-adult-sprinkled-mini-part-2-20-bags',
        img: faker.image.urlLoremFlickr(),
        categoryId: 1,
      },
      {
        title: 'Antibacterial O2 Keamirufa three pack 120MLx3 pieces',
        description:
          'Integrated enzyme agent to the body, can be used from the time you open the cap. ? In a state in which the proteolytic enzymes are mixed in advance, by the component and the balance that has been formulated, achieve high enzyme stability. ? It is now possible to maintain a high proteolytic capacity over a long period of time. ? Because we realize the formulation without blending a preservative antiseptic effect can be obtained, for the eye, friendly care. ? Is a set of antibacterial O2 Keamirufa and lens case.',
        price: 10.44,
        slug: 'antibacterial-o2-keamirufa-three-pack-120mlx3-pieces',
        img: faker.image.urlLoremFlickr(),
        categoryId: 2,
      },
      {
        title: 'Pure "Umeboshi" Pickled Plum Tablets (24 Tablets)',
        description:
          'Tablets made by deseeding then freeze drying carefully selected sour plums from Kishu island in Japan.\nCaptures the pleasantly sour taste of natural sour plums. Artificial flavoring, coloring, and preservative free.',
        price: 1.4,
        slug: 'pure-umeboshi-pickled-plum-tablets-24-tablets',
        img: faker.image.urlLoremFlickr(),
        categoryId: 1,
      },
      {
        title: 'Rascal Does Not Dream of Bunny Girl Senpai (manga)',
        description:
          '"Forget what you saw today."\n\nThere\'s something odd about Sakuta Azusagawa, an acerbic, standoffish high schooler who doesn\'t even own a cell phone in this day and age. And perhaps strange things happen to strange people, which is why on the last day of the Golden Week holiday, in a tranquil library, he meets a wild bunny girl. With that unforgettable encounter, their bizarre and mysterious love story begins.',
        price: 9.99,
        slug: 'rascal-does-not-dream-of-bunny-girl-senpai-manga',
        img: faker.image.urlLoremFlickr(),
        categoryId: 4,
      },
      {
        title: 'Chocolate Yatsuhashi Tin Box (16 Pieces) Otabe',
        description:
          'Rather ~ mortar old-fashioned "Hachikkyo", to "Hachikkyo" of the hunt - rather than baked Kotabe original, was coated with chocolate.\nCrisp and the texture become a habit!',
        price: 5.11,
        slug: 'chocolate-yatsuhashi-tin-box-16-pieces-otabe',
        img: faker.image.urlLoremFlickr(),
        categoryId: 1,
      },
      {
        title: 'Apple Hard Candy (88g)',
        description:
          '"Khoi apple 88g" is, vitamins in one bag C150mg, apple polyphenol 100mg entering. Acidity and rich flavor with apple juice. Package and the taste of apple, nutrients and finished with a firm transmitted design.',
        price: 1.34,
        slug: 'apple-hard-candy-88g',
        img: faker.image.urlLoremFlickr(),
        categoryId: 1,
      },
      {
        title: 'AB double eye liquid 2N',
        description:
          'Firmly stuck the eyelid with an adhesive glue will create a double.',
        price: 5.95,
        slug: 'ab-double-eye-liquid-2n',
        img: faker.image.urlLoremFlickr(),
        categoryId: 2,
      },
      {
        title: 'YA-MAN Circle Peeling Pro HDS-30N',
        description:
          'Per second at about 90,000 times of the ultrasonic vibration and ion care, pores of the rough off and firming care.\nAlso it supports fine dirt, such as PM2.5. In life waterproof, you can use even in the bath.\n● in the pores sonic facial equipment Wurtz and to the skin\n● PM2.5 also removed per second 90,000 times of ultrasonic\n● horny clear, pores dirt care, the three modes of moisture care equipped\n● splash-proof specification can also be used in the bath. IPX4\n● Made in Japan of safety',
        price: 117.79,
        slug: 'ya-man-circle-peeling-pro-hds-30n',
        img: faker.image.urlLoremFlickr(),
        categoryId: 3,
      },
      {
        title: 'Portable Headphone ATH-ES750',
        description:
          'Dignity full of design for the fun-free adults the real thing\nHigh-resolution sound Unusual clarity of sound.\nSophisticated hairline finish and mirror finish of the haze free tone stainless steel housing is played.\nFor stainless steel material: high hardness, adopt excellent stainless steel in strength. In hairline finish and mirror-finished by the hands of the Japanese craftsman, you can enjoy a good sound of the missing control unwanted vibration along with the glossy luster.\nIncrease the magnetic force, it can be played on Fai42㎜ driver of an integrated yoke which pursued the reproducibility of the sound until the hi-res sound source.\nEARSUIT specially designed removable code that was adopted A2DC connector for audio.\nFamiliar to the ear with a light wearing feeling comfortable ear pads.\nFoldable swivel mechanism and convenient to carry with the supplied pouch.',
        price: 176.65,
        slug: 'portable-headphone-ath-es750',
        img: faker.image.urlLoremFlickr(),
        categoryId: 3,
      },
      {
        title:
          '#IT EYES "MELLOW SERIES" 【Color Contacts/1 Day/No Prescription/10Lenses】',
        description:
          "#IT EYES to Anna Fujita's MELLOW SERIES\nNew color GLITTER BRONZE finally appears!",
        price: 13.63,
        slug: 'it-eyes-mellow-series',
        img: faker.image.urlLoremFlickr(),
        categoryId: 2,
      },
      {
        title: 'CANON battery pack BP-819D',
        description: 'CANON battery pack BP-819D',
        price: 113.6,
        slug: 'canon-battery-pack-bp-819d',
        img: faker.image.urlLoremFlickr(),
        categoryId: 3,
      },
      {
        title: 'Naruto, Vol. 2: The Worst Client',
        description:
          "Naruto is a young shinobi with an incorrigible knack for mischief. He's got a wild sense of humor, but Naruto is completely serious about his mission to be the world's greatest ninja!",
        price: 6.49,
        slug: 'naruto-vol-2-the-worst-client',
        img: faker.image.urlLoremFlickr(),
        categoryId: 4,
      },
      {
        title: 'Noragami: Stray God 4',
        description:
          "Though a powerful warrior goddess, Bishamonten suffers from taking on so many shinki. Among Bishamon's many shinki, a terrible plan is formed by one of her most trusted aides. This shinki has dangerous ideas and gets involved with the mysterious Stray. Kazuma has a sense that something is wrong, but can he figure out what exactly is going on? Meanwhile, Hiyori desperately wants Yato to fix her, but he is presented with a solution that is hard to accept. Will Yato fix Hiyori, even if it means he'd have to cut all ties with her?",
        price: 3.5,
        slug: 'noragami-stray-god-4',
        img: faker.image.urlLoremFlickr(),
        categoryId: 4,
      },
      {
        title: 'My Hero Academia, Vol. 1',
        description:
          "Midoriya inherits the superpower of the world's greatest hero, but greatness won’t come easy.\n\nWhat would the world be like if 80 percent of the population manifested superpowers called “Quirks”? Heroes and villains would be battling it out everywhere! Being a hero would mean learning to use your power, but where would you go to study? The Hero Academy of course! But what would you do if you were one of the 20 percent who were born Quirkless?\n\nMiddle school student Izuku Midoriya wants to be a hero more than anything, but he hasn't got an ounce of power in him. With no chance of ever getting into the prestigious U.A. High School for budding heroes, his life is looking more and more like a dead end. Then an encounter with All Might, the greatest hero of them all, gives him a chance to change his destiny…",
        price: 5.4,
        slug: 'my-hero-academia-vol-1',
        img: faker.image.urlLoremFlickr(),
        categoryId: 4,
      },
    ];

    const products = [];

    for (let i = 0; i < productsData.length; i++) {
      products.push(
        await prisma.product.create({
          data: productsData[i],
        }),
      );
    }

    console.log('Products seeded successfully');
    console.log(products);
    return products;
  } catch (error) {
    console.error('Error seeding products:', error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
};
