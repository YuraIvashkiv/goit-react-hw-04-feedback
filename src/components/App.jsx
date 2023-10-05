import { useState } from 'react';
import { FeedbackOptions } from './feedbackOptions/FeedbackOptions';
import { Statistics } from './statistics/Statistics';
import { Section } from './section/Section';
import { Notification } from './notification/Notification';

export const App = () => {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  
  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

   const countPositiveFeedbackPercentage = () => {
        const total = countTotalFeedback();
     return total > 0 ? Math.round((good / total) * 100) : 0;
  };

  const handleState = type => {
    if (type === 'good') {
      setGood(prevState => prevState + 1);
    } else if (type === 'neutral') {
      setNeutral(prevState => prevState + 1);
    } else if (type === 'bad') {
      setBad(prevState => prevState + 1);
    } 
      
  
  }
     const positivePercentage = countPositiveFeedbackPercentage();
  
  const totalFeedback = countTotalFeedback();
   return (
     <div>
       <Section title="Please leave feedback">
         <FeedbackOptions
           options={['good', 'neutral', 'bad']}
           onLeaveFeedback={handleState}
         />
       </Section>

       <Section title="Statistics">
         {countTotalFeedback() !== 0 ? (
           <Statistics
             good={good}
             neutral={neutral}
             bad={bad}
             total={totalFeedback}
             positivePercentage={positivePercentage}
           />
         ) : (
           <Notification message={'There is no feedback'} />
         )}
       </Section>
     </div>
   );
}