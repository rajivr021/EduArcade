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
    superheroName: ''
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

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
      superheroName: user.unsafeMetadata?.superheroName || ''
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
          superheroName: profile.superheroName
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

  const classColors = {
    Explorer: '#4CAF50',
    Guardian: '#2196F3',
    Scholar: '#9C27B0',
    Artisan: '#FF9800'
  };

  const getClassBadge = (classType) => {
    if (!classType) return null;
    return (
      <span
        className="class-badge"
        style={{ backgroundColor: classColors[classType] || '#607D8B' }}
      >
        {classType}
      </span>
    );
  };

  if (!user) {
    navigate('/sign-in');
    return null;
  }

  return (
    <div className="profile-container">
      {showConfetti && (
        <div className="confetti-container">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="confetti" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`
            }} />
          ))}
        </div>
      )}

      <div className="profile-header">
        <h1>🌟 My Profile</h1>
        <p>Customize your learning journey!</p>
      </div>

      <div className="profile-tabs">
        <button
          className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          🏰 My Profile
        </button>
        <button
          className={`tab-button ${activeTab === 'badges' ? 'active' : ''}`}
          onClick={() => setActiveTab('badges')}
        >
          🏆 My Badges
        </button>
        <button
          className={`tab-button ${activeTab === 'progress' ? 'active' : ''}`}
          onClick={() => setActiveTab('progress')}
        >
          📈 My Progress
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
                  <label htmlFor="avatar-upload" className="upload-button"></label>
                </div>
              )}
            </div>
            {!isEditing && profile.superheroName && (
              <div className="superhero-name">
                🦸 Superhero Name: {profile.superheroName}
              </div>
            )}
          </div>

          <div className="profile-details">
            {isEditing ? (
              <>
                <div className="form-group">
                  <label>👑 First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleInputChange}
                    placeholder="Your first name"
                  />
                </div>
                <div className="form-group">
                  <label>👑 Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleInputChange}
                    placeholder="Your last name"
                  />
                </div>
                <div className="form-group">
                  <label>🎂 Age</label>
                  <input
                    type="number"
                    name="age"
                    value={profile.age}
                    onChange={handleInputChange}
                    min="5"
                    max="100"
                    placeholder="How old are you?"
                  />
                </div>
                <div className="form-group">
                  <label>🏅 Class</label>
                  <select
                    name="class"
                    value={profile.class}
                    onChange={handleInputChange}
                  >
                    <option value="">Choose your class</option>
                    <option value="Grade 5 Trailblazer">🌄 Grade 5 Trailblazer (Pioneering new knowledge paths)</option>
                    <option value="Grade 5 Discoverer">🔍 Grade 5 Discoverer (Uncovering hidden wonders)</option>

                    <option value="Grade 6 Navigator">🧭 Grade 6 Navigator (Charting your learning journey)</option>
                    <option value="Grade 6 Inventor">⚙️ Grade 6 Inventor (Building creative solutions)</option>

                    <option value="Grade 7 Pathfinder">🗺️ Grade 7 Pathfinder (Mapping complex concepts)</option>
                    <option value="Grade 7 Alchemist">🧪 Grade 7 Alchemist (Mixing knowledge like magic)</option>

                    <option value="Grade 8 Architect">🏛️ Grade 8 Architect (Designing understanding)</option>
                    <option value="Grade 8 Codebreaker">🔐 Grade 8 Codebreaker (Solving learning puzzles)</option>

                    <option value="Grade 9 Visionary">🔮 Grade 9 Visionary (Seeing future possibilities)</option>
                    <option value="Grade 9 Strategist">♟️ Grade 9 Strategist (Mastering learning plans)</option>

                    <option value="Grade 10 Luminary">💡 Grade 10 Luminary (Lighting the way forward)</option>
                    <option value="Grade 10 Sage">🧠 Grade 10 Sage (Wisdom in many subjects)</option>  </select>
                </div>
                <div className="form-group">
                  <label>❤️ Favorite Subject</label>
                  <input
                    type="text"
                    name="favoriteSubject"
                    value={profile.favoriteSubject}
                    onChange={handleInputChange}
                    placeholder="What do you love learning about?"
                  />
                </div>
                <div className="form-group">
                  <label>🦸 Superhero Name</label>
                  <input
                    type="text"
                    name="superheroName"
                    value={profile.superheroName}
                    onChange={handleInputChange}
                    placeholder="Your secret superhero identity"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="profile-field">
                  <span className="field-label">👋 Name:</span>
                  <span className="field-value">
                    {profile.firstName} {profile.lastName}
                  </span>
                </div>
                <div className="profile-field">
                  <span className="field-label">🎂 Age:</span>
                  <span className="field-value">
                    {profile.age || 'Secret!'}
                  </span>
                </div>
                <div className="profile-field">
                  <span className="field-label">🏅 Class:</span>
                  <span className="field-value">
                    {profile.class ? (
                      <>
                        {getClassBadge(profile.class)}
                        {profile.class === 'Explorer' && ' 🌍'}
                        {profile.class === 'Guardian' && ' 🛡️'}
                        {profile.class === 'Scholar' && ' 📚'}
                        {profile.class === 'Artisan' && ' 🎨'}
                      </>
                    ) : 'Not chosen yet'}
                  </span>
                </div>
                <div className="profile-field">
                  <span className="field-label">❤️ Favorite Subject:</span>
                  <span className="field-value">
                    {profile.favoriteSubject || 'Everything!'}
                  </span>
                </div>
              </>
            )}

            <div className="profile-actions">
              {isEditing ? (
                <>
                  <button onClick={handleSave} className="save-button">
                    🎉 Save My Profile
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="cancel-button"
                  >
                    ❌ Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="edit-button"
                >
                  ✏️ Customize My Profile
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'badges' && (
        <div className="badges-tab">
          <h2>🏆 My Achievement Badges</h2>
          <div className="badges-grid">
            <div className="badge-card">
              <div className="badge-icon">⭐</div>
              <h3>First Steps</h3>
              <p>Completed your first lesson</p>
            </div>
            <div className="badge-card locked">
              <div className="badge-icon">🔒</div>
              <h3>Math Wizard</h3>
              <p>Complete 10 math challenges</p>
            </div>
            <div className="badge-card">
              <div className="badge-icon">📚</div>
              <h3>Bookworm</h3>
              <p>Read 5 stories</p>
            </div>
            <div className="badge-card locked">
              <div className="badge-icon">🔒</div>
              <h3>Creative Genius</h3>
              <p>Create 3 projects</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'progress' && (
        <div className="progress-tab">
          <h2>📈 My Learning Journey</h2>
          <div className="progress-stats">
            <div className="stat-card">
              <div className="stat-value">7</div>
              <div className="stat-label">Lessons Completed</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">3</div>
              <div className="stat-label">Badges Earned</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">12</div>
              <div className="stat-label">Learning Streak</div>
            </div>
          </div>
          <div className="progress-chart">
            <div className="chart-bar" style={{ height: '60%' }}>
              <div className="chart-label">Math</div>
            </div>
            <div className="chart-bar" style={{ height: '45%' }}>
              <div className="chart-label">Reading</div>
            </div>
            <div className="chart-bar" style={{ height: '30%' }}>
              <div className="chart-label">Science</div>
            </div>
            <div className="chart-bar" style={{ height: '25%' }}>
              <div className="chart-label">Art</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;