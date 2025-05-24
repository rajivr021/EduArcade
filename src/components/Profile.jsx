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
    favoriteColor: '#2ecc71' // Modern green color
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
      favoriteColor: user.unsafeMetadata?.favoriteColor || '#2ecc71'
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
    const adjectives = ['Quantum', 'Neon', 'Cyber', 'Eco', 'Galactic', 'Pixel', 'Hyper'];
    const nouns = ['Explorer', 'Scholar', 'Pioneer', 'Virtuoso', 'Savant', 'Prodigy', 'Genius'];
    const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${randomAdj} ${randomNoun}`;
  };

  const classOptions = [
    { value: 'Grade 5 Trailblazer', label: '🌄 Grade 5 Trailblazer' },
    { value: 'Grade 5 Discoverer', label: '🔍 Grade 5 Discoverer' },
    { value: 'Grade 6 Navigator', label: '🧭 Grade 6 Navigator' },
    { value: 'Grade 6 Inventor', label: '⚙️ Grade 6 Inventor' },
    { value: 'Grade 7 Pathfinder', label: '🗺️ Grade 7 Pathfinder' },
    { value: 'Grade 7 Alchemist', label: '🧪 Grade 7 Alchemist' },
    { value: 'Grade 8 Architect', label: '🏛️ Grade 8 Architect' },
    { value: 'Grade 8 Codebreaker', label: '🔐 Grade 8 Codebreaker' },
    { value: 'Grade 9 Visionary', label: '🔮 Grade 9 Visionary' },
    { value: 'Grade 9 Strategist', label: '♟️ Grade 9 Strategist' },
    { value: 'Grade 10 Luminary', label: '💡 Grade 10 Luminary' },
    { value: 'Grade 10 Sage', label: '🧠 Grade 10 Sage' }
  ];

  const getClassColor = (classType) => {
    if (!classType) return '#95a5a6';
    const gradeMatch = classType.match(/Grade (\d+)/);
    if (!gradeMatch) return '#2ecc71';
    
    const grade = parseInt(gradeMatch[1]);
    const hue = (grade * 30) % 360;
    return `hsl(${hue}, 70%, 50%)`;
  };

  if (!user) {
    navigate('/sign-in');
    return null;
  }

  return (
    <div className="profile-container">
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
            <div className="modal-header">
              <h3>🦸 Create Your Superhero Identity</h3>
              <button 
                className="close-modal"
                onClick={() => setShowSuperheroModal(false)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p>Every great learner needs a superhero name to match their potential!</p>
              <div className="superhero-input-group">
                <input
                  type="text"
                  value={profile.superheroName}
                  onChange={(e) => setProfile({...profile, superheroName: e.target.value})}
                  placeholder="Enter your superhero name"
                  className="superhero-input"
                />
                <button 
                  className="generate-button"
                  onClick={() => setProfile({...profile, superheroName: generateSuperheroName()})}
                >
                  <span className="button-icon">🎲</span> Generate
                </button>
              </div>
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
        <div className="header-content">
          <h1>
            <span className="header-icon">👤</span> 
            My Learning Profile
          </h1>
          <p className="header-subtitle">Customize your learning identity and track your progress</p>
        </div>
        <div className="header-gradient"></div>
      </div>

      <div className="profile-tabs">
        <button
          className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <span className="tab-icon">👤</span> Profile
        </button>
        <button
          className={`tab-button ${activeTab === 'badges' ? 'active' : ''}`}
          onClick={() => setActiveTab('badges')}
        >
          <span className="tab-icon">🏆</span> Badges
        </button>
        <button
          className={`tab-button ${activeTab === 'progress' ? 'active' : ''}`}
          onClick={() => setActiveTab('progress')}
        >
          <span className="tab-icon">📈</span> Progress
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'profile' && (
          <div className="profile-card">
            <div className="avatar-section">
              <div className="avatar-containerProfile">
                <div className="avatar-frame" style={{ borderColor: profile.favoriteColor }}>
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
                        <span className="upload-icon">📷</span> Change Photo
                      </label>
                    </div>
                  )}
                </div>
                {profile.superheroName && (
                  <div 
                    className={`superhero-badge ${isEditing ? 'editable' : ''}`}
                    onClick={isEditing ? () => setShowSuperheroModal(true) : null}
                    style={{ backgroundColor: profile.favoriteColor }}
                  >
                    🦸 {profile.superheroName}
                    {isEditing && <span className="edit-icon">✏️</span>}
                  </div>
                )}
              </div>
            </div>

            <div className="profile-details">
              {isEditing ? (
                <div className="edit-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={profile.firstName}
                        onChange={handleInputChange}
                        placeholder="Your first name"
                      />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={profile.lastName}
                        onChange={handleInputChange}
                        placeholder="Your last name"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Age</label>
                      <input
                        type="number"
                        name="age"
                        value={profile.age}
                        onChange={handleInputChange}
                        min="5"
                        max="18"
                        placeholder="Your age"
                      />
                    </div>
                    <div className="form-group">
                      <label>Class</label>
                      <select
                        name="class"
                        value={profile.class}
                        onChange={handleInputChange}
                        style={{ borderColor: getClassColor(profile.class) }}
                      >
                        <option value="">Select your class</option>
                        {classOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Favorite Subject</label>
                    <input
                      type="text"
                      name="favoriteSubject"
                      value={profile.favoriteSubject}
                      onChange={handleInputChange}
                      placeholder="What subject do you love most?"
                    />
                  </div>

                  <div className="form-group color-picker">
                    <label>Favorite Color</label>
                    <div className="color-picker-container">
                      <input
                        type="color"
                        name="favoriteColor"
                        value={profile.favoriteColor}
                        onChange={handleInputChange}
                      />
                      <span className="color-preview" style={{ backgroundColor: profile.favoriteColor }}></span>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button onClick={handleSave} className="save-button">
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="cancel-button"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="view-profile">
                  <div className="profile-field">
                    <span className="field-label">Name</span>
                    <span className="field-value">
                      {profile.firstName} {profile.lastName}
                    </span>
                  </div>
                  <div className="profile-field">
                    <span className="field-label">Age</span>
                    <span className="field-value">
                      {profile.age || 'Not specified'}
                    </span>
                  </div>
                  <div className="profile-field">
                    <span className="field-label">Class</span>
                    <span 
                      className="field-value class-badge"
                      style={{ backgroundColor: getClassColor(profile.class) }}
                    >
                      {profile.class || 'Not selected'}
                    </span>
                  </div>
                  <div className="profile-field">
                    <span className="field-label">Favorite Subject</span>
                    <span className="field-value">
                      {profile.favoriteSubject || 'Not specified'}
                    </span>
                  </div>
                  <div className="profile-field">
                    <span className="field-label">Favorite Color</span>
                    <span 
                      className="field-value color-preview"
                      style={{ backgroundColor: profile.favoriteColor }}
                    ></span>
                  </div>

                  <button
                    onClick={() => setIsEditing(true)}
                    className="edit-profile-button"
                  >
                    Edit Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'badges' && (
          <div className="badges-container">
            <div className="section-header">
              <h2>🏆 My Achievement Badges</h2>
              <p>Earn badges by completing challenges and activities</p>
            </div>
            
            <div className="badges-grid">
              <div className="badge-card earned">
                <div className="badge-icon">⭐</div>
                <div className="badge-content">
                  <h3>First Steps</h3>
                  <p>Completed your first lesson</p>
                  <div className="badge-date">Earned: Today!</div>
                </div>
              </div>
              
              <div className="badge-card earned">
                <div className="badge-icon">📚</div>
                <div className="badge-content">
                  <h3>Bookworm</h3>
                  <p>Read 5 stories</p>
                  <div className="badge-date">Earned: 2 days ago</div>
                </div>
              </div>
              
              <div className="badge-card earned">
                <div className="badge-icon">🧠</div>
                <div className="badge-content">
                  <h3>Quick Learner</h3>
                  <p>Completed 3 lessons in one day</p>
                  <div className="badge-date">Earned: 1 week ago</div>
                </div>
              </div>
              
              <div className="badge-card locked">
                <div className="badge-icon">🔒</div>
                <div className="badge-content">
                  <h3>Math Wizard</h3>
                  <p>Complete 10 math challenges</p>
                  <div className="progress-container">
                    <div className="progress-bar">
                      <div className="progress" style={{ width: '30%' }}></div>
                    </div>
                    <span>3/10</span>
                  </div>
                </div>
              </div>
              
              <div className="badge-card locked">
                <div className="badge-icon">🔒</div>
                <div className="badge-content">
                  <h3>Creative Genius</h3>
                  <p>Create 3 projects</p>
                  <div className="progress-container">
                    <div className="progress-bar">
                      <div className="progress" style={{ width: '66%' }}></div>
                    </div>
                    <span>2/3</span>
                  </div>
                </div>
              </div>
              
              <div className="badge-card locked">
                <div className="badge-icon">🔒</div>
                <div className="badge-content">
                  <h3>Science Explorer</h3>
                  <p>Complete 5 science experiments</p>
                  <div className="progress-container">
                    <div className="progress-bar">
                      <div className="progress" style={{ width: '20%' }}></div>
                    </div>
                    <span>1/5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="progress-container">
            <div className="section-header">
              <h2>📊 My Learning Progress</h2>
              <p>Track your journey and see how far you've come</p>
            </div>
            
            <div className="progress-stats">
              <div className="stat-card">
                <div className="stat-icon">📚</div>
                <div className="stat-content">
                  <div className="stat-value">7</div>
                  <div className="stat-label">Lessons Completed</div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">🏆</div>
                <div className="stat-content">
                  <div className="stat-value">3</div>
                  <div className="stat-label">Badges Earned</div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">🔥</div>
                <div className="stat-content">
                  <div className="stat-value">12</div>
                  <div className="stat-label">Day Streak</div>
                </div>
              </div>
            </div>
            
            <div className="progress-chart-container">
              <h3>📈 Subject Mastery</h3>
              <div className="progress-chart">
                <div className="chart-bar-container">
                  <div className="chart-bar" style={{ height: '60%', backgroundColor: '#2ecc71' }}>
                    <div className="chart-percent">60%</div>
                  </div>
                  <div className="chart-label">Math</div>
                </div>
                
                <div className="chart-bar-container">
                  <div className="chart-bar" style={{ height: '45%', backgroundColor: '#3498db' }}>
                    <div className="chart-percent">45%</div>
                  </div>
                  <div className="chart-label">Reading</div>
                </div>
                
                <div className="chart-bar-container">
                  <div className="chart-bar" style={{ height: '30%', backgroundColor: '#9b59b6' }}>
                    <div className="chart-percent">30%</div>
                  </div>
                  <div className="chart-label">Science</div>
                </div>
                
                <div className="chart-bar-container">
                  <div className="chart-bar" style={{ height: '25%', backgroundColor: '#e67e22' }}>
                    <div className="chart-percent">25%</div>
                  </div>
                  <div className="chart-label">Art</div>
                </div>
              </div>
            </div>
            
            <div className="recent-activity">
              <h3>🔄 Recent Activity</h3>
              <ul className="activity-list">
                <li className="activity-item">
                  <div className="activity-icon">⭐</div>
                  <div className="activity-content">
                    <div className="activity-title">Completed "Introduction to Fractions"</div>
                    <div className="activity-date">Today at 3:45 PM</div>
                  </div>
                </li>
                
                <li className="activity-item">
                  <div className="activity-icon">📚</div>
                  <div className="activity-content">
                    <div className="activity-title">Read "The Magic Treehouse" story</div>
                    <div className="activity-date">Yesterday at 2:30 PM</div>
                  </div>
                </li>
                
                <li className="activity-item">
                  <div className="activity-icon">🧪</div>
                  <div className="activity-content">
                    <div className="activity-title">Finished "Volcano Experiment" activity</div>
                    <div className="activity-date">2 days ago</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;