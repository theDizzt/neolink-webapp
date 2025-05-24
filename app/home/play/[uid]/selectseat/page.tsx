'use client';
import { useState } from 'react';

type Seat = {
    id: string;
    row: string;
    number: number;
    reserved?: boolean;
    groupId?: string;
};

type GroupInfo = {
    id: string;
    name: string;
    seats: string[];
};

export default function TheaterSeatMap() {
    const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
    const [hoveredGroup, setHoveredGroup] = useState<GroupInfo | null>(null);

    // 좌석 그룹 정의
    const groupDefinitions: GroupInfo[] = [
        { id: 'group1', name: '앞자리 좌측', seats: ['A1', 'B1', 'B2'] },
        { id: 'group2', name: '앞자리 중앙', seats: ['A2', 'A3', 'B3'] },
        { id: 'group3', name: '앞자리 우측', seats: ['A4', 'B4', 'B5'] },
        { id: 'group4', name: '중앙 좌측', seats: ['C1', 'C2', 'D1', 'D2'] },
        { id: 'group5', name: '정중앙', seats: ['C3', 'C4', 'D3', 'D4'] },
        { id: 'group6', name: '중앙 우측', seats: ['C5', 'C6', 'D5', 'D6'] },
        { id: 'group7', name: '뒷자리', seats: ['E1', 'E2', 'E3', 'E4', 'E5'] }
    ];

    // 좌석 만들기 위해 데이터 생성
    const generateSeats = () => {
        const rows = [
            { row: 'A', count: 4 },
            { row: 'B', count: 5 },
            { row: 'C', count: 6 },
            { row: 'D', count: 6 },
            { row: 'E', count: 5 }
        ];

        const seats: Seat[] = [];

        rows.forEach(rowInfo => {
            for (let i = 1; i <= rowInfo.count; i++) {
                const seatId = `${rowInfo.row}${i}`; //A1,A2.. 만들기
                const group = groupDefinitions.find(g => g.seats.includes(seatId));//좌석이 포함된 그룹을 찾는다 예)A1은 group1

                seats.push({
                    id: seatId,
                    row: rowInfo.row,
                    number: i,
                    groupId: group.id
                });
            }
        });

        return seats;
    };

    const seats = generateSeats();

    // 현재 선택된 그룹의 좌석들
    const selectedSeats = selectedGroup
        ? groupDefinitions.find(g => g.id === selectedGroup).seats //selectedgroup이 있으면 해당 그룹의 좌석 반환  예)selectedGroup = group1 이면 selectedSeats = [a1,a2]
        : [];

    //그룹 선택/해제를 토글하는 함수 
    const toggleGroupSelection = (groupId: string) => {
        setSelectedGroup(prev => prev === groupId ? null : groupId);
    };

    // 그룹 호버 관리
    const handleSeatHover = (seatId: string) => {
        const seat = seats.find(s => s.id === seatId);
        if (seat?.groupId) {
            const group = groupDefinitions.find(g => g.id === seat.groupId);
            setHoveredGroup(group || null);
        } else {
            setHoveredGroup(null);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-center mb-8">좌석 선택</h1>
            {/* 무대 나중에 이미지 삽입 해야됨 */}
            <div className="bg-blue-600 text-white text-center py-3 mb-8 rounded">
                무대
            </div>

            {/* 좌석 배치도 */}
            <div className="grid gap-4 mb-8">
                {['A', 'B', 'C', 'D', 'E'].map(row => (
                    <div key={row} className="flex justify-center gap-2">
                        {seats
                            .filter(seat => seat.row === row)
                            .map(seat => {
                                const isInHoveredGroup = hoveredGroup && seat.groupId === hoveredGroup.id;//호버 상태 확인
                                const isSelected = selectedSeats.includes(seat.id);//선택 상태 확인

                                return (
                                    <button
                                        key={seat.id}
                                        onClick={() => seat.groupId && toggleGroupSelection(seat.groupId)}
                                        onMouseEnter={() => handleSeatHover(seat.id)}
                                        onMouseLeave={() => setHoveredGroup(null)}
                                        className={`w-20 h-20 rounded flex justify-center transition-colors
                      ${isSelected
                                                ? 'bg-black'
                                                : isInHoveredGroup
                                                    ? 'bg-gray-500 border-2 border-black/500'
                                                    : 'bg-white border border-black/100'}`}
                                    />
                                );
                            })}
                    </div>
                ))}
            </div>

        </div>
    );
}