import { FaRegUserCircle } from "react-icons/fa";
import MessagesSidebar from "../MessagesSidebar/MessagesSidebar";

const MainLayout = () => {
  return (
    <div className="grid grid-rows-[4rem_1fr] grid-cols-[16rem_1fr] h-screen">
      <nav className="row-span-1 col-span-2 bg-red-400 border-b border-red-400">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="/" className="flex ms-2 md:me-24">
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  Private Vault
                </span>
              </a>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <FaRegUserCircle
                  style={{ width: "28px", height: "28px", color: "white" }}
                  height={28}
                  width={28}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className="row-span-1 col-span-1 bg-white border-r border-red-400 overflow-y-auto"
        aria-label="Sidebar"
      >
        <div className="h-full overflow-y-auto">
          <MessagesSidebar
            onSelect={(msg) => {
              console.log("Selected:", msg);
            }}
          />
        </div>
      </aside>

      <main className="row-span-1 col-span-1 p-4">your content</main>
    </div>
  );
};

export default MainLayout;
