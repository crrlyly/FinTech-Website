import TopNav from "../../components/app/shared/TopNav";
import SettingsForms from "../../components/app/settings/SettingsForms";
import Questions from "../../components/app/settings/Questions";

const Settings = () => {
  return (
    <div className={`w-full min-h-dvh pt-20 relative flex flex-col bg-(--primary)`}>
      <TopNav title="Settings"></TopNav>
      <SettingsForms></SettingsForms>
      <Questions></Questions>
    </div>
  );
};

export default Settings;
