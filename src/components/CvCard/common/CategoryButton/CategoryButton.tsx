import "./CategoryButton.css";

type Props = {
  label: string;
  content: [string] | string;

  onClick: () => void;
  isContentVisible: boolean;
  icon: string;
};

export const CategoryButton: React.FC<Props> = ({
  label,
  content,
  onClick,
  isContentVisible,
  icon,
}) => {
  return (
    <>
      <div className="categoryTab">
        <div className="tab" onClick={onClick}>
          <div className="dot">
            <div className="smallDot">
              <img src={icon}></img>
            </div>
          </div>
          <div className="label">{label}</div>
        </div>
      </div>
      <div>
        {isContentVisible && (
          <div className="content">
            {Array.isArray(content) ? (
              content.map((skill, index) => (
                <div key={index} className="line">
                  {skill}
                </div>
              ))
            ) : (
              <div className="line">{content}</div>
            )}
          </div>
        )}
      </div>
    </>
  );
};
