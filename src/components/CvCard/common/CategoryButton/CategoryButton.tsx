import "./CategoryButton.css";

type Props = {
  label: string;
  content: [string] | string;
  botIcon: string;
  onClick: () => void;
  askBot: (ask:string) => void;
  isContentVisible: boolean;
  icon: any;
  activeLanguage: {
    [key: string]: string;
  };
  blockQuestionBot: boolean;
};

export const CategoryButton: React.FC<Props> = ({
  label,
  content,
  onClick,
  askBot,
  activeLanguage,
  isContentVisible,
  icon,
  botIcon,
  blockQuestionBot
}) => {

  const handleAskBot = (label:string) => {
    const ask = `${activeLanguage['answer']} ${label}`
    askBot(ask)

}
  return (
    <>
      <div className="categoryTab" >
        {!blockQuestionBot &&<img src={botIcon} className="ask-bot" onClick={()=> handleAskBot(label)}></img>}
        <div className="tab" onClick={onClick} style={blockQuestionBot ? {width: '100%'} : {width: '93%'}}>
          <div className="dot">
            <div className="smallDot">
              <img src={icon}></img>
            </div>
          </div>
          <div className="label" >{label}</div>
        </div>
      </div>
      <div>
        {isContentVisible && (
          <div className="content" >
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
