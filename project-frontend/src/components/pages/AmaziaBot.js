import ChatBot from 'react-simple-chatbot';
import React,{useState} from 'react'
import "./AmaziaBot.css";
import styled from 'styled-components'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { ThemeProvider } from 'styled-components';

function AmaziaBot() {

const[isExpended,setExpended] = useState(false)



const Div = styled.div`
text-align: center;
`;

const theme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: "#0c005a",
  headerFontColor: '#fff',
  headerFontSize: '20px',
  botBubbleColor: "#0c005a",
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#0c005a',
};
 
    return (
        <div>
        <h1 className="bot-page-title">עוזר אמזיה</h1>
        <div className={isExpended? "image-hidden" :"box"}>
        <img alt="baxi" onClick={()=>{setExpended(true)}}  src="../photos/baxi1.jpeg"/>
        </div>
         <ThemeProvider theme={theme}>
<ChatBot
className={isExpended? "bot-fade-in" : "bot"}
headerTitle="Baxi"
  steps={[
      {
        id: '1',
        message: '?איך אוכל לעזור',
        trigger: '2',
      },
      {
        id: '2',
        options: [
          { value: 1, label: 'תקלת מייל', trigger: '4' },
          { value: 2, label: 'דרייברים', trigger: '52' },
          { value: 3, label: 'אפליקציות', trigger: '42' },
          { value: 4, label: 'תקלת מחשוב', trigger: '26' },
          { value: 5, label: 'לינק', trigger: '11' },
          { value: 6, label: 'רשת', trigger: '14' },
          { value: 7, label: 'תיקיות רשת', trigger: '15' },
          { value: 8, label: 'הרשאות למערכות מודיעיניות', trigger: '22' },



        ],
      },
      {
        id: '3',
        message: '?איזה תקלה יש לך',
        trigger: '4',
      },
      {
        id: '4',
        options: [
          { value: 1, label: 'הרשאות על תיבת מייל', trigger: '7' },
          { value: 2, label: 'יצירת קבוצת תפוצה', trigger: '9' },
          { value: 3, label: 'יצירת מייל קיבוצי', trigger: '10' },
          { value: 4, label: 'מייל תקוע', trigger: '5' }
         
        ],
      },
      {
        id: '5',
        message:
         ` יש לפתוח פרופיל חדש, לדרך פיתרון העתק נתיב לשורת הראן `,
        trigger: '38',
      },
      {
      id: '38',
      component: (
        <Div>
     <CopyToClipboard text="some path">
    <div className="chatbot-path">some path</div>
       </CopyToClipboard>
     </Div>
      ),
      trigger: '6',
    },
      {
        id: '6',
        options: [
          { value: 1, label: 'עזר', trigger: '8' },
          { value: 2, label: 'לא עזר', trigger: '7' },
        ],
      },
      {
        id: '7',
        message: 'יש לפתוח תקלה בסי איי לאמזיה',
        end: true
      },
      {
        id: '8',
        message: 'שמחתי לעזור',
        end: true
      },
      {
        id: '9',
        message: 'יש לגשת לאתר JoinMe',
        trigger: "6",
      },
      {
        id: '10',
        message:
         `יש לגשת לאתר זהות אחת`,
        trigger: '6',
      },
      {
        id: '11',
        options: [
          { value: 1, label: 'אני חייל חדש ואין לי לינק', trigger: '12' },
          { value: 2, label: 'אני לא מצליח למצוא אנשים בלינק', trigger: '13' },
        ],
      },
      {
        id: '12',
        message:
         `יש לפתוח תקלה לצוות אדג׳ לשפעול לינק`,
        end: true,
      },
      {
        id: '13',
        message:
         `יש לעדכן  את ספר הכתובות, לפיתרון מלא העתק את הנתיב לשורת הראן `,
        trigger: '39',
      },
      {
      id: '39',
      component: (
        <Div>
     <CopyToClipboard text="some path">
    <div className="chatbot-path">some path</div>
       </CopyToClipboard>
     </Div>
      ),
      trigger: '6',
    },
      {
        id: '14',
        message:`יש לפתוח תקלה בסי איי לצוות טכנאי בסיס`,
        end: true,
      },
      {
        id: '15',
        options: [
          { value: 1, label: 'אין לי הרשאות לתיקייהֿ', trigger: '16' },
          { value: 2, label: 'יש לי הרשאות ואני עדיין לא מצליח לגשת לתיקייה', trigger: '19' },
        ],
      },
      {
        id: '16',
        message:
         `יש לפנות לאחראי התיקייה ולבקש הרשאות`,
        trigger: '17',
      },
      {
        id: '17',
        options: [
          { value: 1, label: 'עזר', trigger: '8' },
          { value: 2, label: 'לא עזר', trigger: '18' },
        ],
      },
      {
        id: '18',
        message:
         `יש לפנות לצוות hydra`,
        end: true,
      },
      {
        id: '19',
        message:
         `יש לןןדא שההרשאות עדיין קיימות ושהניתוב לתיקייה נכון`,
        trigger: '20',
      },
      {
        id: '20',
        message:
         `אפשר לנסות ניתוב נוסף: ניתוב`,
        trigger: '21',
      },
      {
        id: '21',
        message:
         `יש לעדכן כתובות די אנ אס, לפיתרון מלא העתק ניתוב לשורת הראן`,
        trigger: '40',
      },
      {
      id: '40',
      component: (
        <Div>
     <CopyToClipboard text="some path">
    <div className="chatbot-path">some path</div>
       </CopyToClipboard>
     </Div>
      ),
      trigger: '6',
    },
      {
        
        id: '22',
        message:
         `בדוק בנתיב זה למה אתה חשוף `,
        trigger: '41',
      },
      {
      id: '41',
      component: (
        <Div>
     <CopyToClipboard text="some path">
    <div className="chatbot-path">some path</div>
       </CopyToClipboard>
     </Div>
      ),
      trigger: '23',
    },
      {
        id: '23',
        options: [
          { value: 1, label: 'אני חשוף', trigger: '24' },
          { value: 2, label: 'אני לא חשוף', end: true },
        ],
      },
      {
        
        id: '24',
        message:
         `יש לפנות לצוות ליצ׳י לקבלת הרשאות`,
        end: true,
      },
      {
        id: '25',
        message: '?איזה תקלה יש לך',
        trigger: '26',
      },
      {
        id: '26',
        options: [
          { value: 1, label: 'תקלת מסך', trigger: '27' },
          { value: 2, label: 'תקלת מחשב', trigger:'30' },
        ],
      },
      {
        id: '27',
        options: [
          { value: 1, label: 'מסך שחור', trigger: '28' },
          { value: 2, label: 'לא מצליח לחבר 2 מסכים', trigger: '29' },
        ],
      },
      {
        id: '28',
        message: 'יש לוודא שהחיבורים תקינים, לאחר מכן יש לנסות להחליף את הכבל מסך והכבל חשמל',
        trigger: '6',
      },
      {
        id: '29',
        message: 'יש להתקין דרייבר מסך',
        trigger: '2',
      },
      {
        id: '30',
        options: [
          { value: 1, label: 'המחשב לא עולה', trigger: '31' },
          { value: 2, label: 'המחשב איטי', trigger:'37' },
          { value: 3, label: 'אין מקום במחשב', trigger:'36' },
        ],
      },
      {
        id: '31',
        message: 'יש לוודא שהספק כוח מחובר למחשב ושהמקור חשמל(שקע) תקין',
        trigger: '32',
      },
      {
        id: '32',
        options: [
          { value: 1, label: 'עזר', trigger: '8' },
          { value: 2, label: 'לא עזר', trigger: '33' },
        ],
      },
      {
        id: '33',
        message: 'יש לוודא הספק כוח מתאים ועובד, יש לנסות להחליף לשנאי של 90 וואט',
        trigger: '34',
      },
      {
        id: '34',
        options: [
          { value: 1, label: 'עזר', trigger: '8' },
          { value: 2, label: 'לא עזר', trigger: '35' },
        ],
      },
      {
        id: '35',
        message: 'יש לנתק את המחשב וללחוץ בלי לעזוב על הכפתור הדלקה במשך 30 שניות',
        trigger: '6',
      },
      {
        id: '36',
        message: 'יש להיכנס לתיקיית היוזרים בכונן סי ולמחוק את היוזרים שלא בשימוש',
        trigger: '6',
      },
      {
        id: '37',
        message: 'יש לבצע ריסטרט למחשב ולהבאה לשים לב שאין הרבה אפליקציות שעובדות במקביל',
        trigger: '6',
      },
      {
        id: '42',
        options: [
          { value: 1, label: 'התקנת כרום', trigger: '43' },
          { value: 2, label: 'התקנת אופיס', trigger: '44' },
        ],
      },
      {
        id: '44',
        options: [
          { value: 1, label: 'להתקנת חבילת אופיס', trigger: '45' },
          { value: 2, label: 'להתקנת תוכנות אופיס נוספות ', trigger: '46' },
        ],
      },
      {
        id: '45',
        message: 'ראשית יש לסגור את כל תוכנות אופיס שפתוחות, שנית יש להסיר את האופיס עם קובץ הסרה בניתוב זה',
        trigger: '47',
      },
      {
      id: '47',
      component: (
        <Div>
     <CopyToClipboard text="some path">
    <div className="chatbot-path">some path</div>
       </CopyToClipboard>
     </Div>
      ),
      trigger: '48',
    },
    {
        id: '48',
        message: 'לאחר מכן יש להתקין את חבילת האופיס מחדש מנתיב זה',
        trigger: '49',
      },
      {
      id: '49',
      component: (
        <Div>
     <CopyToClipboard text="some path">
    <div className="chatbot-path">some path</div>
       </CopyToClipboard>
     </Div>
      ),
      trigger: '6',
    },
    {
        id: '46',
        options: [
          { value: 1, label: 'להתקנת לינק', trigger: '50' },
          { value: 2, label: 'ויזיו', trigger: '51' },
        ],
      },
      {
      id: '50',
      component: (
        <Div>
     <CopyToClipboard text="some path">
    <div className="chatbot-path">some path</div>
       </CopyToClipboard>
     </Div>
      ),
      trigger: '6',
    },
    {
      id: '51',
      component: (
        <Div>
     <CopyToClipboard text="some path">
    <div className="chatbot-path">some path</div>
       </CopyToClipboard>
     </Div>
      ),
      trigger: '6',
    },
    {
      id: '43',
      component: (
        <Div>
     <CopyToClipboard text="some path">
    <div className="chatbot-path">some path</div>
       </CopyToClipboard>
     </Div>
      ),
      trigger: '6',
    },
    {
        id: '52',
        options: [
          { value: 1, label: 'דרייבר לקורא טביעת אצבע', trigger: '53' },
          { value: 2, label: 'דרייבר מסך', trigger: '54' },
          { value: 3, label: 'דרייבר מדפסות', trigger: '55' },
          { value: 4, label: 'דרייבר לסורק', trigger: '60' }
         
        ],
      },
      {
      id: '53',
      component: (
        <Div>
     <CopyToClipboard text="some path">
    <div className="chatbot-path">some path</div>
       </CopyToClipboard>
     </Div>
      ),
      trigger: '6',
    },
    {
      id: '54',
      component: (
        <Div>
     <CopyToClipboard text="some path">
    <div className="chatbot-path">some path</div>
       </CopyToClipboard>
     </Div>
      ),
      trigger: '6',
    },
    {
        id: '55',
        message: 'שם החברה?',
        trigger: '56',
      },
      {
        id: '56',
        options: [
          { value: 1, label: 'brother', trigger: '57' },
          { value: 2, label: 'cannon', trigger: '58' },
          { value: 3, label: 'hp', trigger: '59' },
        ],
      },
      {
      id: '57',
      component: (
        <Div>
     <CopyToClipboard text="some path">
    <div className="chatbot-path">some path</div>
       </CopyToClipboard>
     </Div>
      ),
      trigger: '6',
    },
    {
      id: '58',
      component: (
        <Div>
     <CopyToClipboard text="some path">
    <div className="chatbot-path">some path</div>
       </CopyToClipboard>
     </Div>
      ),
      trigger: '6',
    },
    {
      id: '59',
      component: (
        <Div>
     <CopyToClipboard text="some path">
    <div className="chatbot-path">some path</div>
       </CopyToClipboard>
     </Div>
      ),
      trigger: '6',
    },
    {
      id: '60',
      component: (
        <Div>
     <CopyToClipboard text="some path">
    <div className="chatbot-path">some path</div>
       </CopyToClipboard>
     </Div>
      ),
      trigger: '6',
    },
    ]}
/>
</ThemeProvider>


        </div>
    )
}

export default AmaziaBot;
