import TopNav from "../../components/app/shared/TopNav";
import SettingsForms from "../../components/app/settings/SettingsForms";
import Questions from "../../components/app/settings/Questions";

const Settings = () => {
  return (
    <div className={`w-full min-h-dvh pt-20 lg:pt-18 lg:w-[calc(100%-17.5rem)] relative flex flex-col lg:ml-70 lg:px-5 bg-(--primary)`}>
      <TopNav title="Settings"></TopNav>
      <SettingsForms></SettingsForms>
      <Questions></Questions>
    </div>
  );
};

export default Settings;
