export const CurrentDate = async () => {
//   return fetch('https://worldtimeapi.org/api/ip')
//     .then(response => response.json())
//     .then(data => {
//       // Extract the date and time from the response data
//       const dateTime = data.datetime;

//       // Extract the date part from the datetime string
//       const datePart = dateTime.split('T')[0];

//       console.log('Date:', datePart);
//     })
//     .catch(error => {
//       console.error('Error fetching date and time:', error);
//     });

    const res = await fetch('https://worldtimeapi.org/api/ip');
    const date = res.json();
    console.log(date);
};
