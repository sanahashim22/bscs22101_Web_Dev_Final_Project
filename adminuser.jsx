// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const AdminUser = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/admin/users')
//       .then(response => {
//         setUsers(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching users:', error);
//       });
//   }, []);

//   return (
//     <div className="admin-users-container">
//       <h2 className="admin-header">Admin Users</h2>
//       <div className="user-list">
//         {users.length > 0 ? (
//           users.map(user => (
//             <div key={user._id} className="user-box">
//               <h3 className="user-name">Name: {user.name}</h3>
//               <p className="user-email">Email: {user.email}</p>
//               <p className="user-password">Password: {user.password}</p>
//             </div>
//           ))
//         ) : (
//           <p>No users found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminUser;


import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Users</h2>
      <div className="flex flex-col gap-6 max-w-3xl mx-auto">
        {users.length > 0 ? (
          users.map(user => (
            <div key={user._id} className="bg-gray-100 border border-gray-300 p-4 rounded-lg shadow-md transform transition-transform duration-200 hover:translate-y-[-5px]">
              <h3 className="text-xl font-semibold text-red-600">Name: {user.name}</h3>
              <p className="text-lg text-black mt-2">Email: {user.email}</p>
              <p className="text-lg text-black mt-2">Password: {user.password}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminUser;
