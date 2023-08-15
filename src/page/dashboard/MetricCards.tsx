import styled from 'styled-components';

interface MetricCardProps {
  title: string;
  value: string;
  subValue: string;
}

export const StyledMetricCards = styled.div`
  display: flex;
  gap: 24px;

  .card {
    box-sizing: border-box;
    width: 250px;
    border: 1px solid grey;
    padding: 16px;
    border-radius: 10px;
    background-color: #f1f1f1;
    box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.2);

    .header {
      align-items: center;
      display: flex;
      justify-content: space-between;
    }

    .title {
      font-weight: bold;
    }
    .value {
      text-align: right;
      font-size: 2em;
    }
  }
`;

export function MetricCard({ title, value, subValue }: MetricCardProps) {
  return (
    <div className="card">
      <div className="header">
        <div className="title">{title}</div>
        <div className="subValue">{subValue}</div>
      </div>
      <div className="value">{value}</div>
    </div>
  );
}
