// import { pagesOptions } from '@/app/api/auth/[...nextauth]/pages-options';
// import withAuth from 'next-auth/middleware';
// import { createI18nMiddleware } from 'next-international/middleware';
// import { NextRequest } from 'next/server';
// const I18nMiddleware = createI18nMiddleware({
//   locales: ['en', 'ka'],
//   defaultLocale: 'ka',
// });
// export default withAuth({
//   pages: {
//     ...pagesOptions,
//   },
// });
// export function middleware(request: NextRequest) {
//   return I18nMiddleware(request);
// }
// export const config = {
//   // restricted routes
//   matcher: [
//     // '/',
//     // '/analytics',
//     // '/logistics/:path*',
//     // '/ecommerce/:path*',
//     // '/support/:path*',
//     // '/file/:path*',
//     // '/file-manager',
//     // '/invoice/:path*',
//     // '/forms/profile-settings/:path*',
//   ],
// };
// middleware.ts
import type { NextRequest } from 'next/server';

import { createI18nMiddleware } from 'next-international/middleware';

const I18nMiddleware = createI18nMiddleware({
  locales: ['en', 'ka'],
  defaultLocale: 'en',
});

const protectedRoutes = ['/'];

export async function middleware(request: NextRequest) {
  // const pathName = request.nextUrl.pathname.split('/')[2];

  // const authHttpResponse = await fetch('http://localhost:3000/api/session', {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });

  // const data: any = await authHttpResponse.json();
  // console.log('data', data);

  // if (!data.authenticated) {
  //   return NextResponse.redirect(request.nextUrl.origin);
  // }

  // const path = request.nextUrl.pathname;
  // const session = await fetch('http://localhost:3000/api/session');
  // console.log('path', path);
  // if (!session.authenticated) {
  //   return NextResponse.redirect(`http://localhost:3000/ka/signin`);
  // }
  return await I18nMiddleware(request);
}

export const config = {
  matcher: [
    '/',
    '/analytics',
    '/logistics/:path*',
    '/ecommerce/:path*',
    '/support/:path*',
    '/file/:path*',
    '/file-manager',
    '/invoice/:path*',
    '/forms/profile-settings/:path*',
  ],
};
