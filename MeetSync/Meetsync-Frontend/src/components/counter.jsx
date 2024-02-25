import { useState, useEffect } from "react";

const Counter = ({ target }) => {
    const [count, setCount] = useState(0);
  
    useEffect(() => {
      const increment = target / 10000; // Ajustez le dénominateur pour contrôler la vitesse
  
      const updateCounter = () => {
        setCount((currentCount) => {
          if (currentCount < target) {
            const updatedCount = Math.ceil(currentCount + increment);
            if (updatedCount < target) {
              setTimeout(updateCounter, 1);
              return updatedCount;
            }
            return target;
          }
          return currentCount;
        });
      };
  
      updateCounter();
    }, [target]);
  
    return <>{count}</>;
  };

  export default Counter