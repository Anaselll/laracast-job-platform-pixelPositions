import { Link } from "react-router-dom";
import FeatureCard from "../components/FeatureCard";
import Hero from "../components/hero";
import Student from '../assets/student.png'
import Tutor from "../assets/tutor.png";
export default function Home(){
  
    return (
      <>
        <Hero />
        <div className="flex flex-wrap justify-center gap-8 mt-8">
          <Link to="/offers/find_tutor">
            <FeatureCard
              title="Student"
              description="Find your Tutor"
              image={Student}
              bgColor="bg-ring"
            />
          </Link>

          <Link to="/offers/find_student">
            <FeatureCard
              title="Tutor"
              description="Find your Student"
              image={Tutor}
              bgColor="bg-gold"
            />
          </Link>
        </div>
      </>
    );
}