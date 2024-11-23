// Name - Usha Sai Chintha, UTA ID - 1002155333
// Name - Shiney Chinthamalla, UTA ID - 1002170536
// Name - Sai Charan Challa, UTA ID - 1002147720
// Name - Venkata Satya Kiranmai Challagulla, UTA ID - 1002195499
// Name - Dinesh Reddy Bommana, UTA ID - 1002163421

"use client";

import "./globals.css";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import FeaturedProfile from "../components/Featured/Featured";
import { Provider } from "react-redux";
import store, { persistor } from "../app/redux/store";
import { PersistGate } from "redux-persist/integration/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen flex">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Sidebar />

            <div className="flex flex-col flex-grow">
              <Header />

              <div className="flex flex-grow">
                <div className="flex-1 overflow-hidden p-4">{children}</div>
                <FeaturedProfile />
              </div>
            </div>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
