'use client';

import Link from 'next/link';
import Image from 'next/image';

import { swell, useSwellContext } from '@/app/swell';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';

export default function LayoutHeader() {
  const { account, setAccount } = useSwellContext();
  const pathname = usePathname();

  const onClickLogout = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    swell.account.logout().then(() => setAccount(null));
  };

  return (
    <header>
      <nav
        aria-label="Top"
        className={classNames(
          'absolute top-0 left-0 right-0 z-20 bg-white bg-opacity-10 backdrop-blur-xl backdrop-filter ',
          {
            'text-white': pathname === '/',
          }
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center">
            <div className="ml-4 flex lg:ml-0">
              <Link href="/" className="flex items-center">
                <Image src="/icon.png" width={40} height={40} alt="Honest Reviews" />
                <p className="ml-4">Honest Reviews</p>
              </Link>
            </div>

            <div className="ml-auto flex items-center">
              <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-6">
                {account ? (
                  <>
                    <span className="text-sm font-medium ">
                      Welcome, {account.name || account.email}
                    </span>
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                    <a href="#" onClick={onClickLogout} className="text-sm font-medium ">
                      Log out
                    </a>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="text-sm font-medium ">
                      Sign in
                    </Link>
                    <span className="h-6 w-px bg-current" aria-hidden="true" />
                    <Link href="/signup" className="text-sm font-medium ">
                      Create account
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
