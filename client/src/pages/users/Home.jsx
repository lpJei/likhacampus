import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const announcements = [
    {
      id: 1,
      title: "Art Fair on Campus",
      desc: "Join us this Friday for the annual student art fair at the main hall.",
      image: "https://via.placeholder.com/400x250?text=Art+Fair",
    },
    {
      id: 2,
      title: "New Exhibit: Digital Arts",
      desc: "Explore the latest works in digital media at the Library Gallery.",
      image: "https://via.placeholder.com/400x250?text=Digital+Arts",
    },
  ];

  const featuredArtist = {
    name: "Alexandra Cruz",
    course: "BS Multimedia Arts",
    bio: "Alexandra is a 3rd-year student specializing in digital painting and concept art.",
    image: "https://via.placeholder.com/200x200?text=Alexandra",
  };

  const exploreProjects = () => {
    navigate("/projects");
  };

  return (
    <>
      <div className="space-y-16">
        {/* Hero Section */}
        <section className="hero min-h-[60vh] bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-xl">
              <h1 className="text-5xl font-bold text-primary">
                Welcome to LikhaCampus
              </h1>
              <p className="py-6 text-base-content">
                A hub for student creativity, collaboration, and inspiration.
              </p>
              <button className="btn btn-primary" onClick={exploreProjects}>
                Explore Portfolios
              </button>
            </div>
          </div>
        </section>

        {/* FEATURED ARTIST */}
        <div className="px-6">
          <h2 className="text-3xl font-bold mb-6 text-primary">
            Featured Artist of the Week
          </h2>
          <div className="card lg:card-side bg-base-100 shadow-xl border border-base-300">
            <figure className="lg:w-1/3">
              <img
                src={featuredArtist.image}
                alt={featuredArtist.name}
                className="object-cover w-full h-full"
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title text-2xl">{featuredArtist.name}</h3>
              <span className="badge badge-primary w-fit">
                {featuredArtist.course}
              </span>
              <p className="mt-2">{featuredArtist.bio}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-outline btn-primary">
                  View Portfolio
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ANNOUNCEMENTS */}
        <div className="px-6">
          <h2 className="text-3xl font-bold mb-6 text-primary">
            Announcements
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {announcements.map((a) => (
              <div
                key={a.id}
                className="card bg-base-100 shadow-xl border border-base-300"
              >
                <figure>
                  <img
                    src={a.image}
                    alt={a.title}
                    className="w-full h-48 object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title">{a.title}</h3>
                  <p>{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
