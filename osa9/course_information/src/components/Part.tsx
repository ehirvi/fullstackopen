import { CoursePart } from "../types";
import { assertNever } from "../utils";

interface PartProps {
  course: CoursePart;
}

const Part = (props: PartProps) => {
  const checkCourseType = () => {
    switch (props.course.kind) {
      case "basic":
        return <p>{props.course.description}</p>;
      case "group":
        return <p>project exercises {props.course.groupProjectCount}</p>;
      case "background":
        return (
          <>
            <p>{props.course.description}</p>
            <p>materials {props.course.backgroundMaterial}</p>
          </>
        );
      case "special":
        return (
          <>
            <p>{props.course.description}</p>
            <p>required skills: {props.course.requirements.join(", ")}</p>
          </>
        );
      default:
        return assertNever(props.course);
    }
  };

  return (
    <div>
      <h3>
        {props.course.name} {props.course.exerciseCount}
      </h3>
      {checkCourseType()}
    </div>
  );
};

export default Part;
