import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

function TooltipButton({ children, tooltipText, placement = "top" }) {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {tooltipText}
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement={placement}
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      <span>{children}</span>
    </OverlayTrigger>
  );
}

export default TooltipButton;
