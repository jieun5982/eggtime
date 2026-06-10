const TIMES = [
  { id: 0, minutes: 6, label: '반숙\n(흐르는)' },
  { id: 1, minutes: 8, label: '반숙\n(촉촉)' },
  { id: 2, minutes: 12, label: '완숙' },
];

const { useState, useEffect } = React;

function App() {
  const [selectedTime, setSelectedTime] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(TIMES[0].minutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(TIMES[0].minutes * 60);

  const currentTime = TIMES[selectedTime];
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  useEffect(() => {
    let interval;
    if (isRunning && remainingSeconds > 0) {
      interval = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            alert('계란이 익었습니다!');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, remainingSeconds]);

  const handleStart = () => {
    if (remainingSeconds > 0 && !isRunning) {
      setIsRunning(true);
    }
  };

  const handleTimeSelect = (id) => {
    if (!isRunning) {
      setSelectedTime(id);
      const newTotal = TIMES[id].minutes * 60;
      setTotalSeconds(newTotal);
      setRemainingSeconds(newTotal);
    }
  };

  const timeDisplay = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return React.createElement('div', { style: { textAlign: 'center', padding: '40px 20px' } },
    React.createElement('h1', null, '달걀 타이머'),
    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '40px' } },
      TIMES.map((time) =>
        React.createElement('button', {
          key: time.id,
          onClick: () => handleTimeSelect(time.id),
          style: {
            padding: '15px',
            border: selectedTime === time.id ? '2px solid #ff6b35' : '2px solid #ddd',
            background: selectedTime === time.id ? '#ff6b35' : 'white',
            color: selectedTime === time.id ? 'white' : 'black',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
          },
          disabled: isRunning,
        },
          React.createElement('div', { style: { fontSize: '20px', fontWeight: '600', marginBottom: '5px' } }, `${time.minutes}분`),
          React.createElement('div', { style: { fontSize: '11px' } }, time.label)
        )