import "./CategoryButton.css";

type Props = {
  label: string;
  content: [string] | string;
  botIcon: string;
  onClick: () => void;
  askBot: (ask:string) => void;
  isContentVisible: boolean;
  icon: any;
};

export const CategoryButton: React.FC<Props> = ({
  label,
  content,
  onClick,
  askBot,

  isContentVisible,
  icon,
  botIcon
}) => {

  const handleAskBot = (label:string) => {
    const ask = `chcę wiedzieć więcej o ${label}`
    askBot(ask)

}
  return (
    <>
      <div className="categoryTab">
        <img src={botIcon} className="ask-bot" onClick={()=> handleAskBot(label)}></img>
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
