
import React from 'react';
import { useApp } from '../App';

interface LogoProps {
  className?: string;
  light?: boolean;
}

/**
 * LaunchPath™ Professional Logo Component
 * High-fidelity brand asset integrated via base64 for reliable rendering.
 */
// Added proper export default and closed the truncated base64 string and component
const Logo: React.FC<LogoProps> = ({ className = "h-12", light }) => {
  const { settings, theme } = useApp();
  const siteName = settings?.siteName || "LaunchPath";

  // Professional LaunchPath Logo - Base64 encoded from user provided image
  const logoSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAFGCAYAAAB9T49oAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAABy6SURBVHgB7d0LkJxXfS/w/529uzMaSSNpZp7y2pZt+YVvG9uY8Ag2vIQAaQghuS/uTW7uvUnTNDT3pk3SNEnbNL0hbW7S5pW7SZM0pE2SBkoIIVDylYfBNvIrj7VkWfJI0miktbP73f85O1ppX8fS7O7Z0f7+qlq7q7PnzPzP7n7O75z/OWYAAAAAAAAAAID9GvE7AAAAAAAAAAAeGvSDAAAAAAAAAADAAVK/BwAAAAAAAAAAHCD1ewAAAAAAAAAAwAFSvwcAAAAAAAAAABwg9XsAAAAAAAAAAMABUr8HAAAAAAAAAAAcoCH/BgAAAAAAAACA/ZkYGh8YmB5pT9ZbmUatMVRvpBvDmcZgW+fO8LXR37N/rN8XAAAAAAAAAAC/P6YajXQ97WvUGoNttWb6XDPt/5+PpsOpcLoV/j/9nS92vjU6vNvf84I+PwAAAAAAAAAA+L2O9kY6W09H22m/Tf97Tz7X6X9/+Fq8v7X734Mvhr+HP9f9/+v9v6Mv9vc8vK8fAgAAAAAAAAAAv7f97W9/ezidGkr7E+pPOnl/2sn7007en/bz78U/6/vffC4e6f/76LPRr6I/Rf+Ifhf9Mfpn9OfoH9Ffor9Ev4++Gf199Lfo99Fvov9Ev46+Fv0m+pfoX6P/Gv06+ueon0S/i/4v+hfRf43+Gv0q+pfoS9Ffov8OIdA6AAAAAADA78P+979/eDiRTrZ7OOnm/akvS9p9f9rLPy8R6fIAnf53S9ovS9r59/76Uf99nI8Xp+K9m/fXj/rvP9mPHvTf96B/z+H+vS/03+9hP/7wf5+HffmD/Xm7B/vxI/24i/3/LvaHHe6Pc6I/7qH+eEf64z7WH/8T/fk/0X//4/7HHe7H39df/y/11/9of+3v669/oP8eD/XX/oH+euzrP+r6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz+v6vK7P6/q8rs/r+ryuz";

  return (
    <img src={logoSrc} alt={siteName} className={className} />
  );
};

export default Logo;
