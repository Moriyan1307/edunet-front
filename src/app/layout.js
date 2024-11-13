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
                <div className="flex-1 p-4">{children}</div>
                <FeaturedProfile />
              </div>
            </div>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
