"use client";

// import { useEffect, useState } from 'react';
// import styles from './sakuraPetal.module.css'

// export default function SakuraPetal () {
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   if (!isClient) return null;

//   return (
    // <div className={styles.sakuraPetal}>
    //   {[...Array(15)].map((_, i) => {
    //     const left = Math.random() * 100;
    //     const delay = Math.random() * 5;
    //     const duration = 5 + Math.random() * 5;

        // return (
          // <div
          //   key={i}
          //   className={styles.sakuraPetal}

          //   style={{
          //     left: `${left}%`,
          //     animationDelay: `${delay}s`,
          //     animationDuration: `${duration}s`
          //   }}
          // />
//         );
//       })}
//     </div>
//   );
// };
