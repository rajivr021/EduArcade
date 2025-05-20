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
    avatar: ''
  });

  useEffect(() => {
    if (user) {
      const isGoogleAccount = user.externalAccounts?.some(
        (account) => account.provider === 'oauth_google'
      );

      const avatarUrl = user.imageUrl || '';

      setProfile({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        age: user.unsafeMetadata?.age || '',
        class: user.unsafeMetadata?.class || '',
        avatar: avatarUrl
      });
    }
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
        },
      });

      setIsEditing(false);
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

  if (!user) {
    navigate('/sign-in');
    return null;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>🌿 Your EduArcade Profile</h1>
        <p>Manage your enchanted account details</p>
      </div>

      <div className="profile-card">
        <div className="avatar-section">
          <img
            src={profile.avatar}
            alt="Profile"
            className="profile-avatar"
          />
          {isEditing && (
            <div className="avatar-upload">
              <label htmlFor="avatar-upload" className="upload-button">
                Change Avatar
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: 'none' }}
              />
            </div>
          )}
        </div>

        <div className="profile-details">
          {isEditing ? (
            <>
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Age</label>
                <input
                  type="number"
                  name="age"
                  value={profile.age}
                  onChange={handleInputChange}
                  min="5"
                  max="100"
                />
              </div>
              <div className="form-group">
                <label>Class</label>
                <select
                  name="class"
                  value={profile.class}
                  onChange={handleInputChange}
                >
                  <option value="">Select your class</option>
                  <option value="Explorer">Explorer</option>
                  <option value="Guardian">Guardian</option>
                  <option value="Scholar">Scholar</option>
                  <option value="Artisan">Artisan</option>
                </select>
              </div>
            </>
          ) : (
            <>
              <div className="profile-field">
                <span className="field-label">Name:</span>
                <span className="field-value">
                  {profile.firstName} {profile.lastName}
                </span>
              </div>
              <div className="profile-field">
                <span className="field-label">Age:</span>
                <span className="field-value">
                  {profile.age || 'Not specified'}
                </span>
              </div>
              <div className="profile-field">
                <span className="field-label">Class:</span>
                <span className="field-value">
                  {profile.class || 'Not selected'}
                </span>
              </div>
            </>
          )}

          <div className="profile-actions">
            {isEditing ? (
              <>
                <button onClick={handleSave} className="save-button">
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="cancel-button"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="edit-button"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
