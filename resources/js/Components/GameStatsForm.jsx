import React from 'react';

const GameStatsForm = ({
  shiftsWorked,
  GoldenEggsCollected,
  PowerEggsCollected,
  KingSalmonidsDefeated,
  CrewMembersRescued,
  Totalpoints,
  handleShiftsWorkedChange,
  handleGoldenEggsChange,
  handlePowerEggsChange,
  handleKingSalmonidsChange,
  handleCrewMembersChange,
  handleTotalPointsChange,
  updateSuccess,
}) => {
  return (
    <form className='flex flex-col' onSubmit={updateGameStats}>
      {/* ... game stats input fields ... */}
      {updateSuccess ? (
        <div className="text-green-600 my-2 px-6 py-3 mx-6 font-thin text-[0.8rem] flex flex-row">
          Game stats updated successfully
        </div>
      ) : null}
      <p className='text-gray-400 font-thin text-[0.75rem] px-6 py-2'>
        To get this information download the Nintendo Switch Online app and search your in-game stats on Splatoon 3
      </p>
    </form>
  );
};

export default GameStatsForm;
