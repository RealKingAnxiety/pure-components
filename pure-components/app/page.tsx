'use client';

import { useState, useEffect } from 'react';

// ==================== Challenge 1: Fixed Clock ====================
function Clock({ time }: { time: Date }) {
  const hours = time.getHours();
  const className = hours >= 0 && hours <= 6 ? 'night' : 'day';

  return (
    <h1 id="time" className={className}>
      {time.toLocaleTimeString()}
    </h1>
  );
}

// ==================== Challenge 2: Fixed Profile ====================
function Profile({ person, isCollapsed }: { person: any; isCollapsed: boolean }) {
  return (
    <div className="profile">
      <h2>{person.name}</h2>
      {!isCollapsed && (
        <div>
          <img src={person.image} alt={person.name} style={{ width: '100px' }} />
          <p>{person.bio}</p>
        </div>
      )}
    </div>
  );
}

// ==================== Challenge 3: Fixed Story Tray ====================
function StoryTray({ stories }: { stories: any[] }) {
  const createStory = { id: 0, label: 'Create Story' };

  // Avoid mutation by creating a new array
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

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const person1 = {
    name: 'Taylor Swift',
    image: 'https://picsum.photos/id/64/100',
    bio: 'Singer-songwriter and musician.'
  };

  const person2 = {
    name: 'Kanye West',
    image: 'https://picsum.photos/id/65/100',
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

      {/* Challenge 1: Clock */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">1. Fixed Clock</h2>
        <Clock time={time} />
        <p className="mt-2 text-sm text-gray-600">
          Change your system timezone to test night/day mode
        </p>
      </section>

      {/* Challenge 2: Profiles */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">2. Fixed Profile</h2>
        <div className="flex gap-8">
          <div>
            <button 
              onClick={() => setCollapsed1(!collapsed1)}
              className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {collapsed1 ? 'Expand' : 'Collapse'} Taylor
            </button>
            <Profile person={person1} isCollapsed={collapsed1} />
          </div>

          <div>
            <button 
              onClick={() => setCollapsed2(!collapsed2)}
              className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {collapsed2 ? 'Expand' : 'Collapse'} Kanye
            </button>
            <Profile person={person2} isCollapsed={collapsed2} />
          </div>
        </div>
      </section>

      {/* Challenge 3: Story Tray */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">3. Fixed Story Tray</h2>
        <StoryTray stories={stories} />
        <p className="mt-4 text-sm text-gray-600">
          "Create Story" appears only once (no duplication)
        </p>
      </section>
    </div>
  );
}
