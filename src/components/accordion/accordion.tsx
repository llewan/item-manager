import React, { useState } from "react";

type AccordionProps = {
  children: JSX.Element;
};

export const Accordion = ({ children }: AccordionProps) => {
  return <div className="Accordion">{children}</div>;
};

type AccordionItemProps = {
  children: JSX.Element;
  title: string;
};

export const AccordionItem = (props: AccordionItemProps) => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  return (
    <div
      className={`Accordion-item ${
        accordionOpen ? "" : "Accordion-item--collapsed"
      }`}
    >
      <div
        className="Accordion-header"
        onClick={() => {
          setAccordionOpen(!accordionOpen);
        }}
      >
        <div className="Accordion-toggle">{accordionOpen ? "-" : "+"}</div>
        <div className="Accordion-title">{props.title}</div>
      </div>
      <div className="Accordion-content">{props.children}</div>
    </div>
  );
};
