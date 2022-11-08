import Submenu from 'frontend/components/submenu';
import { settingsSubmenuNotificationList, settingsSubmenuNotificationOther } from 'frontend/data';

const Notifications = () => {
  return (
    <Submenu
      title="NOTIFICATIONS"
      username="Preferences"
      routes={settingsSubmenuNotificationList}
      secondBlocks={[{ title: 'Other', block: settingsSubmenuNotificationOther }]}
      noTag
      md={12}
      topDiv
    />
  );
};

export default Notifications;
