import "./Buttons.css";
import { Tooltip } from "@mui/material";

function Button({
  variant, // test, filled, outlined
  color,
  tooltip,
  leftIcon,
  rightIcon,
  children,
  className,
  ...props
}) {
  var customClassName = `${className} customBtn ${color} ${variant}`;

  if (tooltip)
    return (
      <Tooltip title={tooltip} leaveDelay={500}>
        <button className={customClassName} {...props}>
          {leftIcon}
          <span>{children}</span>
          {rightIcon}
        </button>
      </Tooltip>
    );
  else
    return (
      <button className={customClassName} {...props}>
        {leftIcon}
        <span>{children}</span>
        {rightIcon}
      </button>
    );
}

export default Button;
