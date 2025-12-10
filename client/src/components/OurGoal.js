import pic from '../assets/background.png';

const OurGoal = () => {
  return (
    <>

      <div
        className="home-bg"
        style={{
          backgroundImage: `url(${pic})`,
          padding: '60px 0',
        }}
      >
        <div
          style={{
            maxWidth: '700px',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <h1
            className="title"
            style={{
              color: '#8b3d2e',
              marginBottom: '30px',
            }}
          >
            Our Goal
          </h1>

          <h3
            style={{
              fontSize: '18px',
              color: '#6b4326',
              lineHeight: 1.6,
              fontWeight: 'normal',
            }}
          >
            At ActiClub, our goal is to create a space where people can explore
            their creativity, develop new skills, and share their passions with
            others. We aim to connect individuals who want to learn, teach, or
            participate in engaging activities that inspire personal growth and
            community collaboration.
          </h3>
        </div>
      </div>
    </>
  );
};

export default OurGoal;
