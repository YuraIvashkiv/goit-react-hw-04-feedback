import { Component } from 'react';
import { FeedbackOptions } from './feedbackOptions/FeedbackOptions';
import { Statistics } from './statistics/Statistics';
import { Section } from './section/Section';
import { Notification } from './notification/Notification';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  // hasFeedback = false;

  handleState = type => {
    // console.log('Button clicked:', type);
    this.setState(prevState => {
      return {
        [type]: prevState[type] + 1
      };
    }
    );
  
    //    () => {
    //     const { good, neutral, bad } = this.state;

    //   this.hasFeedback = good + neutral + bad > 0;
    // }
  
  };

  

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  };

  countPositiveFeedbackPercentage = () => {
    const { good } = this.state;
    const total = this.countTotalFeedback();
    return total > 0 ? Math.round((good / total) * 100) : 0;
  };



    render() {
      const { good, neutral, bad } = this.state;
      // console.log("State:", good, neutral, bad);
      const totalFeedback = this.countTotalFeedback();
      const positivePercentage = this.countPositiveFeedbackPercentage();

    
    return (
      <div>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={['good', 'neutral', 'bad']}
            onLeaveFeedback={this.handleState}
          />
        </Section>

        <Section title="Statistics">
          {this.countTotalFeedback() !== 0 ? (
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
}
