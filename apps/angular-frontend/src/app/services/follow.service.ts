import { Component, Injectable, Input, Output, EventEmitter } from '@angular/core';
import { PersonService } from './person.service';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { resolve } from 'dns';
import { Room } from '../../../../../libs/models';

@Injectable({
    providedIn: 'root',
})
export class FollowService {
    @Output() fireFollowers: EventEmitter<any> = new EventEmitter();
    // @Output() fireFollowersSidenav: EventEmitter<any> = new EventEmitter();

    constructor(private router: Router, private http: HttpClient, private personService: PersonService, private authService: AuthService) {
        console.log('FollowService started');
    }

    reloadFollowers() {
        console.log('reloadFollowers called');

        this.personService.getFollowed().subscribe((rooms) => {
            if (rooms.length != null) {
                for (let room of rooms) {
                    this.getStreamer(room)
                }
                this.fireFollowers.emit(rooms);
            }
        });
    }

    // Get Streamer based on room id
    getStreamer(room: Room) {
        const temp = room.streamer as unknown
        const name = temp as string
        this.personService.getById(name).subscribe((person) => {
            room.streamer = person;
        })
    }

    // reloadFollowersSidenav() {
    //     console.log('reloadFollowersSidenav called');

    //     this.personService.getFollowed().subscribe((result) => {
    //         this.fireFollowersSidenav.emit(result);
    //     });
    // }

    getEmittedFollowers() {
        return this.fireFollowers;
    }

    // getEmittedFollowersSidenav() {
    //     return this.fireFollowersSidenav;
    // }

    followRoom(room: Room): void {
        console.log('followRoom aangeroepen voor:', room);
        this.personService.getById(this.authService.currentPerson$.value._id).subscribe((person) => {
            console.log('followRoom getById aangeroepen:', person);
            person.followed.push(room)
            this.personService.startStopFollowing(person);
            console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaa:', person.followed);
        })
        setTimeout(() => {
            //Zet time out hoger als update niet werkt (komt door vertraging backend)
            this.reloadFollowers();
        }, 500);
    }

    unfollowRoom(room: Room): void {
        console.log('unfollowRoom aangeroepen voor:', room);
        this.personService.getById(this.authService.currentPerson$.value._id).subscribe((person) => {
            console.log('unfollowRoom getById aangeroepen:', person);
            const roomToRemove = person.followed.find(roomInFollowed => roomInFollowed._id == room._id);
            const roomToRemoveIndex = person.followed.indexOf(roomToRemove);
            person.followed.splice(roomToRemoveIndex, 1);

            console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbb:', person.followed);
            this.personService.startStopFollowing(person);
        })
        setTimeout(() => {
            //Zet time out hoger als update niet werkt (komt door vertraging backend)
            this.reloadFollowers();
        }, 500);
    }
} 