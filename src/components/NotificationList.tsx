import { useRecoilState } from 'recoil';
import { NotificationState } from '../store/notification';
import Notification from './Notification';

const NotificationList = () => {
  const [notificationItems, setNotificationItems] =
    useRecoilState(NotificationState);

  return (
    <>
      <div className="fixed bottom-0 right-0">
        {notificationItems.map((item) => {
          return <Notification key={item.id} type={item.type} msg={item.msg} />;
        })}
      </div>
      {/* {JSON.stringify(notificationItems)} */}
    </>
  );
};

export default NotificationList;
