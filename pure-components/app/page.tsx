'use client';

import { useState, useEffect } from 'react';

// Clock Challenge
function Clock({ time }: { time: Date }) {
  const hours = time.getHours();
  const className = hours >= 0 && hours <= 6 ? 'night' : 'day';

  return (
    <h1 id="time" className={className}>
      {time.toLocaleTimeString()}
    </h1>
  );
}

// Profile Challenge
function Profile({ person, isCollapsed }: { person: any; isCollapsed: boolean }) {
  return (
    <div className="profile">
      <h2>{person.name}</h2>
      {!isCollapsed && (
        <div>
          <img 
            src={person.image} 
            alt={person.name} 
            style={{ width: '180px', borderRadius: '12px' }} 
          />
          <p>{person.bio}</p>
        </div>
      )}
    </div>
  );
}

// Story Tray Challenge
function StoryTray({ stories }: { stories: any[] }) {
  const createStory = { id: 0, label: 'Create Story' };
  const displayStories = [createStory, ...stories];

  return (
    <div className="story-tray">
      {displayStories.map((story, index) => (
        <div key={story.id || index} className="story">
          {story.label || story.name}
        </div>
      ))}
    </div>
  );
}

// Main App
export default function PureComponents() {
  const [time, setTime] = useState(new Date());
  const [collapsed1, setCollapsed1] = useState(false);
  const [collapsed2, setCollapsed2] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const person1 = {
    name: 'Taylor Swift',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Taylor_Swift_-_The_Eras_Tour_-_March_17%2C_2023_%28cropped%29.jpg/800px-Taylor_Swift_-_The_Eras_Tour_-_March_17%2C_2023_%28cropped%29.jpg',
    bio: 'Singer-songwriter and musician.'
  };

  const person2 = {
    name: 'Kanye West',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/71/Kanye_West.jpg',
    bio: 'Rapper, producer, and fashion designer.'
  };

  const stories = [
    { id: 1, name: 'Sara' },
    { id: 2, name: 'Alex' },
    { id: 3, name: 'Jordan' }
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Keeping Components Pure</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">1. Fixed Clock</h2>
        <Clock time={time} />
        <p className="mt-2 text-sm text-gray-600">Change system timezone to test night/day mode</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">2. Fixed Profile</h2>
        <div className="flex gap-8 flex-wrap">
          <div>
            <button 
              onClick={() => setCollapsed1(!collapsed1)}
              className="mb-4 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {collapsed1 ? 'Expand' : 'Collapse'} Taylor
            </button>
            <Profile person={person1} isCollapsed={collapsed1} />
          </div>

          <div>
            <button 
              onClick={() => setCollapsed2(!collapsed2)}
              className="mb-4 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {collapsed2 ? 'Expand' : 'Collapse'} Kanye
            </button>
            <Profile person={person2} isCollapsed={collapsed2} />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">3. Fixed Story Tray</h2>
        <StoryTray stories={stories} />
        <p className="mt-4 text-sm text-gray-600">"Create Story" appears only once</p>
      </section>
    </div>
  );
}