import { useUser } from '@clerk/clerk-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    age: '',
    class: '',
    avatar: '',
    favoriteSubject: '',
    superheroName: '',
    favoriteColor: '#4CAF50' // Default to green
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [showSuperheroModal, setShowSuperheroModal] = useState(false);

  useEffect(() => {
    if (!user) return;

    const googleAccount = user.externalAccounts?.find(
      (account) => account.provider === 'oauth_google'
    );

    const fullName = user.fullName || googleAccount?.username || '';
    const [first, last] = fullName.split(' ');

    setProfile({
      firstName: user.firstName || first || '',
      lastName: user.lastName || last || '',
      age: user.unsafeMetadata?.age || '',
      class: user.unsafeMetadata?.class || '',
      avatar: user.imageUrl || googleAccount?.profileImageUrl || '',
      favoriteSubject: user.unsafeMetadata?.favoriteSubject || '',
      superheroName: user.unsafeMetadata?.superheroName || '',
      favoriteColor: user.unsafeMetadata?.favoriteColor || '#4CAF50'
    });
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await user.update({
        firstName: profile.firstName,
        lastName: profile.lastName,
      });

      await user.update({
        unsafeMetadata: {
          age: profile.age,
          class: profile.class,
          favoriteSubject: profile.favoriteSubject,
          superheroName: profile.superheroName,
          favoriteColor: profile.favoriteColor
        },
      });

      setIsEditing(false);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        await user.setProfileImage({ file });
        const localUrl = URL.createObjectURL(file);
        setProfile((prev) => ({ ...prev, avatar: localUrl }));
      } catch (err) {
        console.error('Error updating avatar:', err);
      }
    }
  };

  const generateSuperheroName = () => {
    const adjectives = ['Amazing', 'Brilliant', 'Courageous', 'Dynamic', 'Energetic', 'Fantastic', 'Glorious'];
    const nouns = ['Explorer', 'Genius', 'Hero', 'Inventor', 'Mastermind', 'Ninja', 'Wizard'];
    const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${randomAdj} ${randomNoun}`;
  };

  const classOptions = [
    { value: 'Grade 5 Trailblazer', label: '🌄 Grade 5 Trailblazer (Pioneering new knowledge paths)' },
    { value: 'Grade 5 Discoverer', label: '🔍 Grade 5 Discoverer (Uncovering hidden wonders)' },
    { value: 'Grade 6 Navigator', label: '🧭 Grade 6 Navigator (Charting your learning journey)' },
    { value: 'Grade 6 Inventor', label: '⚙️ Grade 6 Inventor (Building creative solutions)' },
    { value: 'Grade 7 Pathfinder', label: '🗺️ Grade 7 Pathfinder (Mapping complex concepts)' },
    { value: 'Grade 7 Alchemist', label: '🧪 Grade 7 Alchemist (Mixing knowledge like magic)' },
    { value: 'Grade 8 Architect', label: '🏛️ Grade 8 Architect (Designing understanding)' },
    { value: 'Grade 8 Codebreaker', label: '🔐 Grade 8 Codebreaker (Solving learning puzzles)' },
    { value: 'Grade 9 Visionary', label: '🔮 Grade 9 Visionary (Seeing future possibilities)' },
    { value: 'Grade 9 Strategist', label: '♟️ Grade 9 Strategist (Mastering learning plans)' },
    { value: 'Grade 10 Luminary', label: '💡 Grade 10 Luminary (Lighting the way forward)' },
    { value: 'Grade 10 Sage', label: '🧠 Grade 10 Sage (Wisdom in many subjects)' }
  ];

  const getClassColor = (classType) => {
    if (!classType) return '#607D8B';
    const gradeMatch = classType.match(/Grade (\d+)/);
    if (!gradeMatch) return '#4CAF50';
    
    const grade = parseInt(gradeMatch[1]);
    const hue = (grade * 30) % 360; // Generate different hues based on grade
    return `hsl(${hue}, 70%, 50%)`;
  };

  if (!user) {
    navigate('/sign-in');
    return null;
  }

  return (
    <div className="profile-container" style={{ '--theme-color': profile.favoriteColor }}>
      {showConfetti && (
        <div className="confetti-container">
          {[...Array(100)].map((_, i) => (
            <div key={i} className="confetti" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`
            }} />
          ))}
        </div>
      )}

      {showSuperheroModal && (
        <div className="modal-overlay">
          <div className="superhero-modal">
            <h3>🦸 Create Your Superhero Identity!</h3>
            <p>Every great learner needs a superhero name!</p>
            <div className="superhero-options">
              <input
                type="text"
                value={profile.superheroName}
                onChange={(e) => setProfile({...profile, superheroName: e.target.value})}
                placeholder="Enter your superhero name"
              />
              <button 
                className="generate-button"
                onClick={() => setProfile({...profile, superheroName: generateSuperheroName()})}
              >
                🎲 Generate Random Name
              </button>
            </div>
            <div className="modal-actions">
              <button 
                className="save-button"
                onClick={() => {
                  setShowSuperheroModal(false);
                  if (!profile.superheroName) {
                    setProfile({...profile, superheroName: generateSuperheroName()});
                  }
                }}
              >
                Save Superhero Name
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="profile-header">
        <h1>
          <span className="header-icon">🌟</span> 
          My Adventure Profile
          <span className="header-icon">🌟</span>
        </h1>
        <p>Customize your learning journey and show off your achievements!</p>
      </div>

      <div className="profile-tabs">
        <button
          className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <span className="tab-icon">📝</span> My Profile
        </button>
        <button
          className={`tab-button ${activeTab === 'badges' ? 'active' : ''}`}
          onClick={() => setActiveTab('badges')}
        >
          <span className="tab-icon">🏆</span> My Badges
        </button>
        <button
          className={`tab-button ${activeTab === 'progress' ? 'active' : ''}`}
          onClick={() => setActiveTab('progress')}
        >
          <span className="tab-icon">📊</span> My Progress
        </button>
      </div>

      {activeTab === 'profile' && (
        <div className="profile-card">
          <div className="avatar-section">
            <div className="avatar-frame">
              <img
                src={profile.avatar || '/default-avatar.png'}
                alt="Profile"
                className="profile-avatar"
              />
              {isEditing && (
                <div className="avatar-upload">
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="avatar-upload" className="upload-button">
                    <span className="upload-icon">📷</span> Change
                  </label>
                </div>
              )}
            </div>
            {profile.superheroName && (
              <div 
                className={`superhero-name ${isEditing ? 'editable' : ''}`}
                onClick={isEditing ? () => setShowSuperheroModal(true) : null}
              >
                🦸 Superhero Name: {profile.superheroName}
                {isEditing && <span className="edit-pencil">✏️</span>}
              </div>
            )}
          </div>

          <div className="profile-details">
            {isEditing ? (
              <>
                <div className="form-group">
                  <label><span className="input-icon">👑</span> First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleInputChange}
                    placeholder="Your first name"
                  />
                </div>
                <div className="form-group">
                  <label><span className="input-icon">👑</span> Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleInputChange}
                    placeholder="Your last name"
                  />
                </div>
                <div className="form-group">
                  <label><span className="input-icon">🎂</span> Age</label>
                  <input
                    type="number"
                    name="age"
                    value={profile.age}
                    onChange={handleInputChange}
                    min="5"
                    max="18"
                    placeholder="How old are you?"
                  />
                </div>
                <div className="form-group">
                  <label><span className="input-icon">🏫</span> Class</label>
                  <select
                    name="class"
                    value={profile.class}
                    onChange={handleInputChange}
                    style={{ borderColor: getClassColor(profile.class) }}
                  >
                    <option value="">Choose your class</option>
                    {classOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label><span className="input-icon">❤️</span> Favorite Subject</label>
                  <input
                    type="text"
                    name="favoriteSubject"
                    value={profile.favoriteSubject}
                    onChange={handleInputChange}
                    placeholder="What do you love learning about?"
                  />
                </div>
                <div className="form-group">
                  <label><span className="input-icon">🎨</span> Favorite Color</label>
                  <input
                    type="color"
                    name="favoriteColor"
                    value={profile.favoriteColor}
                    onChange={handleInputChange}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="profile-field">
                  <span className="field-icon">👋</span>
                  <span className="field-label">Name:</span>
                  <span className="field-value">
                    {profile.firstName} {profile.lastName}
                  </span>
                </div>
                <div className="profile-field">
                  <span className="field-icon">🎂</span>
                  <span className="field-label">Age:</span>
                  <span className="field-value">
                    {profile.age || 'Secret!'}
                  </span>
                </div>
                <div className="profile-field">
                  <span className="field-icon">🏫</span>
                  <span className="field-label">Class:</span>
                  <span 
                    className="field-value class-badge"
                    style={{ backgroundColor: getClassColor(profile.class) }}
                  >
                    {profile.class || 'Not chosen yet'}
                  </span>
                </div>
                <div className="profile-field">
                  <span className="field-icon">❤️</span>
                  <span className="field-label">Favorite Subject:</span>
                  <span className="field-value">
                    {profile.favoriteSubject || 'Everything!'}
                  </span>
                </div>
                <div className="profile-field">
                  <span className="field-icon">🎨</span>
                  <span className="field-label">Favorite Color:</span>
                  <span 
                    className="field-value color-preview"
                    style={{ backgroundColor: profile.favoriteColor }}
                  ></span>
                </div>
              </>
            )}

            <div className="profile-actions">
              {isEditing ? (
                <>
                  <button onClick={handleSave} className="save-button">
                    <span className="button-icon">🎉</span> Save My Profile
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="cancel-button"
                  >
                    <span className="button-icon">❌</span> Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="edit-button"
                >
                  <span className="button-icon">✏️</span> Customize My Profile
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'badges' && (
        <div className="badges-tab">
          <h2><span className="section-icon">🏆</span> My Achievement Badges</h2>
          <p className="section-subtitle">Collect badges by completing challenges!</p>
          
          <div className="badges-grid">
            <div className="badge-card earned">
              <div className="badge-icon">⭐</div>
              <div className="badge-ribbon"></div>
              <h3>First Steps</h3>
              <p>Completed your first lesson</p>
              <div className="badge-date">Earned: Today!</div>
            </div>
            <div className="badge-card locked">
              <div className="badge-icon">🔒</div>
              <h3>Math Wizard</h3>
              <p>Complete 10 math challenges</p>
              <div className="progress-bar">
                <div className="progress" style={{ width: '30%' }}></div>
                <span>3/10</span>
              </div>
            </div>
            <div className="badge-card earned">
              <div className="badge-icon">📚</div>
              <div className="badge-ribbon"></div>
              <h3>Bookworm</h3>
              <p>Read 5 stories</p>
              <div className="badge-date">Earned: 2 days ago</div>
            </div>
            <div className="badge-card locked">
              <div className="badge-icon">🔒</div>
              <h3>Creative Genius</h3>
              <p>Create 3 projects</p>
              <div className="progress-bar">
                <div className="progress" style={{ width: '66%' }}></div>
                <span>2/3</span>
              </div>
            </div>
            <div className="badge-card locked">
              <div className="badge-icon">🔒</div>
              <h3>Science Explorer</h3>
              <p>Complete 5 science experiments</p>
              <div className="progress-bar">
                <div className="progress" style={{ width: '20%' }}></div>
                <span>1/5</span>
              </div>
            </div>
            <div className="badge-card locked">
              <div className="badge-icon">🔒</div>
              <h3>Perfect Attendance</h3>
              <p>Log in for 7 days in a row</p>
              <div className="progress-bar">
                <div className="progress" style={{ width: '57%' }}></div>
                <span>4/7</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'progress' && (
        <div className="progress-tab">
          <h2><span className="section-icon">📊</span> My Learning Journey</h2>
          <p className="section-subtitle">See how much you've accomplished!</p>
          
          <div className="progress-stats">
            <div className="stat-card">
              <div className="stat-icon">📚</div>
              <div className="stat-value">7</div>
              <div className="stat-label">Lessons Completed</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🏆</div>
              <div className="stat-value">3</div>
              <div className="stat-label">Badges Earned</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🔥</div>
              <div className="stat-value">12</div>
              <div className="stat-label">Day Streak</div>
            </div>
          </div>
          
          <div className="subject-progress">
            <h3>📈 Subject Progress</h3>
            <div className="progress-chart">
              <div className="chart-bar" style={{ height: '60%', backgroundColor: '#4CAF50' }}>
                <div className="chart-label">Math</div>
                <div className="chart-percent">60%</div>
              </div>
              <div className="chart-bar" style={{ height: '45%', backgroundColor: '#2196F3' }}>
                <div className="chart-label">Reading</div>
                <div className="chart-percent">45%</div>
              </div>
              <div className="chart-bar" style={{ height: '30%', backgroundColor: '#9C27B0' }}>
                <div className="chart-label">Science</div>
                <div className="chart-percent">30%</div>
              </div>
              <div className="chart-bar" style={{ height: '25%', backgroundColor: '#FF9800' }}>
                <div className="chart-label">Art</div>
                <div className="chart-percent">25%</div>
              </div>
            </div>
          </div>
          
          <div className="recent-achievements">
            <h3>🎉 Recent Achievements</h3>
            <ul className="achievements-list">
              <li>
                <span className="achievement-icon">⭐</span>
                Completed "Introduction to Fractions" lesson
              </li>
              <li>
                <span className="achievement-icon">📚</span>
                Read "The Magic Treehouse" story
              </li>
              <li>
                <span className="achievement-icon">🧪</span>
                Finished "Volcano Experiment" activity
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;