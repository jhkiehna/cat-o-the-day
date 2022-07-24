export default async function sendPushNotification(
  expoPushToken: string,
  message: { title: string; body: string; data?: object },
) {
  const body = {
    to: expoPushToken,
    sound: 'default',
    ...message,
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}
