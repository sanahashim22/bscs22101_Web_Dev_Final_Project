// // import { useState } from "react";

// // const Signup = () => {
// //   const [name, setName] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [errorMessage, setErrorMessage] = useState("");

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const response = await fetch("http://localhost:5000/api/auth/register", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({ name, email, password }),
// //       });

// //       if (response.ok) {
// //         setName("");
// //         setEmail("");
// //         setPassword("");
// //         alert("Signup successful! Redirecting to login...");
// //         setTimeout(() => (window.location.href = "/login"), 3000);
// //       } else {
// //         const errorData = await response.json();
// //         setErrorMessage(errorData.message);
// //       }
// //     } catch (error) {
// //       console.error("Signup error:", error);
// //       setErrorMessage("Something went wrong. Please try again later.");
// //     }
// //   };

// //   return (
// //     <div className="auth-container">
// //       <div className="auth-card">
// //         <h1>Sign Up</h1>
// //         <form onSubmit={handleSubmit}>
// //           <input
// //             type="text"
// //             placeholder="Full Name"
// //             value={name}
// //             onChange={(e) => setName(e.target.value)}
// //             required
// //           />
// //           <input
// //             type="email"
// //             placeholder="Email Address"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             required
// //           />
// //           <input
// //             type="password"
// //             placeholder="Password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             required
// //           />
// //           <button type="submit">Sign Up</button>
// //         </form>
// //         {errorMessage && <p className="error-message">{errorMessage}</p>}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Signup;


// import { useState } from "react";

// const Signup = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("guest"); // Default role is guest
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:5000/api/auth/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ name, email, password, role }),
//       });

//       if (response.ok) {
//         setName("");
//         setEmail("");
//         setPassword("");
//         setRole("guest"); // Reset role to default
//         alert("Signup successful! Redirecting to login...");
//         setTimeout(() => (window.location.href = "/login"), 3000);
//       } else {
//         const errorData = await response.json();
//         setErrorMessage(errorData.message);
//       }
//     } catch (error) {
//       console.error("Signup error:", error);
//       setErrorMessage("Something went wrong. Please try again later.");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <h1>Sign Up</h1>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Full Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//           <input
//             type="email"
//             placeholder="Email Address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <select value={role} onChange={(e) => setRole(e.target.value)} required>
//             <option value="guest">Guest</option>
//             <option value="host">Host</option>
//           </select>
//           <button type="submit">Sign Up</button>
//         </form>
//         {errorMessage && <p className="error-message">{errorMessage}</p>}
//       </div>
//     </div>
//   );
// };

// export default Signup;


import { useState } from "react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("guest"); // Default role is guest
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      if (response.ok) {
        setName("");
        setEmail("");
        setPassword("");
        setRole("guest"); // Reset role to default
        alert("Signup successful! Redirecting to login...");
        setTimeout(() => (window.location.href = "/login"), 3000);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="role-dropdown"
          >
            <option value="guest">Guest</option>
            <option value="host">Host</option>
          </select>
          <button type="submit">Sign Up</button>
        </form>
        {errorMessage && <p className="error-message2">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Signup;
