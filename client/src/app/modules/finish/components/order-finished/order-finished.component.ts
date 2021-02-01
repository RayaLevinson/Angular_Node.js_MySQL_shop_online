import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

import { FinishOrderService } from '../../services/finish-order.service';

@Component({
  selector: 'order-finished',
  templateUrl: './order-finished.component.html',
  styleUrls: ['./order-finished.component.css']
})
export class OrderFinishedComponent implements OnInit {
  orderSummaryFileName: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private finishOrderService: FinishOrderService
  ) { }

  ngOnInit(): void {
    this.orderSummaryFileName = this.route.snapshot.queryParams.orderSummary;
  }

  downloadOrderSummary() {
    this.finishOrderService.download(this.orderSummaryFileName);
  }
  
  goShopping() {
    this.router.navigate(['shopping'], { queryParams: { category: '1' } });
  }
}
