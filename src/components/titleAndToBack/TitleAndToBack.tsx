import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import styles from './TitleAndToBack.module.css';

interface TitleAndToBackProps {
  label: string;
}

function TitleAndToBack({ label }: TitleAndToBackProps) {
  const navigate = useNavigate();
  const goToBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.titleContent}>
        <span onClick={goToBack}>
          <ArrowLeft size={35} />
        </span>
        <h1 className="titlePrimary">{label}</h1>
      </div>
  );
}

export default TitleAndToBack;
