package com.aakil.sunset_heaven.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aakil.sunset_heaven.model.Rooms;

@Repository
public interface RoomRepository extends JpaRepository<Rooms,Integer> {

	List<Rooms> findByRoomType(String roomType);



}
 