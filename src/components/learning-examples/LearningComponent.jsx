import FirstComponent from "./FirstComponent";
import LearningJavaScript from "./LearningJavaScript";
import SecondComponent from "./SecondComponent";

export default function LearningComponent() {
    return (
        <div>
          My ToDo Application
          <FirstComponent />
          <SecondComponent />
          <LearningJavaScript />
        </div>
    );
}