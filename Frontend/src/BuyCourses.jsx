import React from "react";

const courses = [
  {
    title: "Web Development",
    description: "Build stunning websites using HTML, CSS, JavaScript, and React.",
    price: "₹19,999",
  },
  {
    title: "Data Science",
    description: "Analyze and visualize data using Python, Pandas, and Machine Learning.",
    price: "₹24,499",
  },
  {
    title: "UI/UX Design",
    description: "Learn user interface design, wireframing, and user experience strategy.",
    price: "₹17,999",
  },
  {
    title: "Cloud Computing",
    description: "Explore AWS, Azure, and modern cloud architecture and deployment.",
    price: "₹22,499",
  },
];

export default function BuyCourses() {
  return (
    <div className="buy-courses-container">
    {courses.map((course, index) => (
      <div key={index} className="buy-course-card">
        <h2>{course.title}</h2>
        <p>{course.description}</p>
        <div className="price">{course.price}</div>
        <button className="buy-now-button">Buy Now</button>
      </div>
    ))}
  </div>
  
      
  );
}
