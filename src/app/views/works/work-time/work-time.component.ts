import { Component, OnInit } from '@angular/core';
import { WorkTimeService } from '../../../services/works/work-time/work-time.service';
@Component({
  selector: 'app-work-time',
  templateUrl: './work-time.component.html',
  styleUrls: ['./work-time.component.css']
})
export class WorkTimeComponent implements OnInit {
  formData = {
    start_time: '',
    end_time: '',
    user_id: '',
    shift_id: '',
    
  }
  constructor(private workTime: WorkTimeService) { }

  ngOnInit() {
  }

}
