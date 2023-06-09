// import { useDispatch } from 'react-redux';
// import css from './UserDataItem.module.scss';
// import { useState } from 'react';
// import { update } from 'redux/auth/operations';

// export const UserDataItem = ({ name, label, type, defaultValue, profile }) => {
//   const emailRegExp = /^.+@.+\..+$/;
//   const cityRegex = /^[a-zA-Z\s,'-]+$/;
//   const phoneRegExp = /^\+380\d{9}$/;
//   const dayToday = new Date().toLocaleDateString();
//   const minDate = new Date('01.01.1910').toLocaleDateString();

//   const dispatch = useDispatch();
//   const [inputValue, setInputValue] = useState(defaultValue ?? '');
//   const [isError, setIsError] = useState('');
//   const [active, setActive] = useState('');

//   const handleChange = e => {
//     const { name, value } = e.currentTarget;

//     if (name === 'userName') {
//       setInputValue(value);
//     }
//     if (name === 'email') {
//       setInputValue(value);
//     } else if (name === 'birthday') {
//       setInputValue(value);
//     } else if (name === 'phone') {
//       setInputValue(value);
//     } else if (name === 'location') {
//       setInputValue(value);
//     }
//   };

//   const handleSubmit = name => {
//     if (name === 'userName') {
//       setActive('userName');
//       if (
//         inputValue.length !== 0 &&
//         (inputValue.length < 2 || inputValue.length > 16)
//       ) {
//         setIsError('type from 2 to 16 letters');
//         return;
//       }
//       setIsError('');
//       setActive('');
//       dispatch(update({ userName: inputValue }));
//     } else if (name === 'email') {
//       setActive('email');
//       if (!inputValue.match(emailRegExp)) {
//         setIsError('please type valid email');
//         return;
//       }
//       setIsError('');
//       setActive('');
//       dispatch(update({ email: inputValue }));
//     } else if (name === 'birthday') {
//       setActive('birthday');
//       if (inputValue > dayToday) {
//         setIsError('date must be current');
//         return;
//       }
//       if (inputValue < minDate) {
//         setIsError('date must be current');
//         return;
//       }
//       setIsError('');
//       setActive('');
//       dispatch(
//         update({
//           birthday: inputValue,
//         }),
//       );
//     } else if (name === 'phone') {
//       setActive('phone');
//       if (!phoneRegExp.test(inputValue)) {
//         setIsError('please type valid phone number starting with +380');
//         return;
//       }
//       if (inputValue.length !== 13) {
//         setIsError('phone number should contain 13 digits');
//         return;
//       }
//       setIsError('');
//       setActive('');
//       dispatch(update({ phone: inputValue }));
//     } else if (name === 'location') {
//       setActive('location');
//       if (!inputValue.match(cityRegex)) {
//         setIsError('use format Kyiv, Brovary');
//         return;
//       }
//       setIsError('');
//       setActive('');
//       dispatch(update({ location: inputValue }));
//     }
//   };

//   const activeHandleClick = name => {
//     if (!active) setActive(name);
//   };

//   return (
//     <>
//       <div>
//         <label htmlFor={name}>{label}</label>

//         <div>
//           <input
//             value={!profile ? inputValue : defaultValue}
//             onChange={handleChange}
//             // active={active === name}
//             disabled={active !== name}
//             type={type}
//             name={name}
//             id={name}
//           />
//           {isError && active === name ? (
//             <div className={css.error}>{isError}</div>
//           ) : null}

//           {!profile &&
//             (active == name ? (
//               // onClick={() => handleSubmit(name)}
//               <button type="button">Ok</button>
//             ) : (
//               <button
//                 type="button"
//                 disabled={active && active !== name}
//                 onClick={() => activeHandleClick(name)}
//               >
//                 Pen
//               </button>
//             ))}
//         </div>
//       </div>
//     </>
//   );
// };
