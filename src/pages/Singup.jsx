import Illustration from "../components/Illustration";
import SingupForm from "../components/SingupForm";
export default function Singup() {
  return (
    <div>
      <h1>Create an account</h1>
      <div className="column">
        <Illustration />
        <SingupForm />
      </div>
    </div>
  );
}
