// const NewPage = () => {
//   return (
//     <div>
//       <h1>New Page</h1>
//       <p>Welcome to the new page!</p>
//     </div>
//   );
// };
// // function NewPage() {
// //   return (
// //     <div>
// //       <h1>New Page</h1>
// //       <p>Welcome to the new page!</p>
// //     </div>
// //   );
// // }
// export default NewPage;
import React from 'react';

function NewPage() {
  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  );
}

function NewPage_process() {
  return (
    <div>
      <NewPage /> {/* Render the component like this */}
    </div>
  );
}

export default NewPage_process;
