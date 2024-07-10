import MainContainerPage from "./MainContainer/MainContainerPage";
import MenuBarPage from "./MenuBar/MenuBarPage";

export default function HomePage() {
  return (
    <div className="flex h-screen">
      <MenuBarPage />
      <MainContainerPage />
    </div>
  );
}
