"use strict";

//need moment.js library

const easterMonday = y =>
  {
  const emDaysByYear =
    [
          98,  90, 103,  95, 114, 106,  91, 111, 102,   // 1901-1909
     87, 107,  99,  83, 103,  95, 115,  99,  91, 111,   // 1910-1919
     96,  87, 107,  92, 112, 103,  95, 108, 100,  91,   // 1920-1929
    111,  96,  88, 107,  92, 112, 104,  88, 108, 100,   // 1930-1939
     85, 104,  96, 116, 101,  92, 112,  97,  89, 108,   // 1940-1949
    100,  85, 105,  96, 109, 101,  93, 112,  97,  89,   // 1950-1959
    109,  93, 113, 105,  90, 109, 101,  86, 106,  97,   // 1960-1969
     89, 102,  94, 113, 105,  90, 110, 101,  86, 106,   // 1970-1979
     98, 110, 102,  94, 114,  98,  90, 110,  95,  86,   // 1980-1989
    106,  91, 111, 102,  94, 107,  99,  90, 103,  95,   // 1990-1999
    115, 106,  91, 111, 103,  87, 107,  99,  84, 103,   // 2000-2009
     95, 115, 100,  91, 111,  96,  88, 107,  92, 112,   // 2010-2019
    104,  95, 108, 100,  92, 111,  96,  88, 108,  92,   // 2020-2029
    112, 104,  89, 108, 100,  85, 105,  96, 116, 101,   // 2030-2039
     93, 112,  97,  89, 109, 100,  85, 105,  97, 109,   // 2040-2049
    101,  93, 113,  97,  89, 109,  94, 113, 105,  90,   // 2050-2059
    110, 101,  86, 106,  98,  89, 102,  94, 114, 105,   // 2060-2069
     90, 110, 102,  86, 106,  98, 111, 102,  94, 114,   // 2070-2079
     99,  90, 110,  95,  87, 106,  91, 111, 103,  94,   // 2080-2089
    107,  99,  91, 103,  95, 115, 107,  91, 111, 103,   // 2090-2099
     88, 108, 100,  85, 105,  96, 109, 101,  93, 112,   // 2100-2109
     97,  89, 109,  93, 113, 105,  90, 109, 101,  86,   // 2110-2119
    106,  97,  89, 102,  94, 113, 105,  90, 110, 101,   // 2120-2129
     86, 106,  98, 110, 102,  94, 114,  98,  90, 110,   // 2130-2139
     95,  86, 106,  91, 111, 102,  94, 107,  99,  90,   // 2140-2149
    103,  95, 115, 106,  91, 111, 103,  87, 107,  99,   // 2150-2159
     84, 103,  95, 115, 100,  91, 111,  96,  88, 107,   // 2160-2169
     92, 112, 104,  95, 108, 100,  92, 111,  96,  88,   // 2170-2179
    108,  92, 112, 104,  89, 108, 100,  85, 105,  96,   // 2180-2189
    116, 101,  93, 112,  97,  89, 109, 100,  85, 105    // 2190-2199
  ];

  return emDaysByYear[ y - 1901 ];
  }

const isWeekend =
  w =>
    (w === "Saturday" || w === "Sunday")
      ? true
      : false;


const isBusinessDayNYSE =
  input => {
    const date = moment(input);

    const w = date.format('dddd');
    const d = date.format('D');
    const dd = date.format('DDD');
    const m = date.format('MMMM');
    const y = date.format('YYYY');

    const em = easterMonday( date.format('YYYY') );

    if (
        isWeekend(w)
        // New Year's Day (possibly moved to Monday if on Sunday)
        || ((d == 1 || (d == 2 && w == "Monday")) && m == "January")
        // Washington's birthday (third Monday in February)
        || ((d >= 15 && d <= 21) && w == "Monday" && m == "February")
        // Good Friday
        || (dd == em-3)
        // Memorial Day (last Monday in May)
        || (d >= 25 && w == "Monday" && m == "May")
        // Independence Day (Monday if Sunday or Friday if Saturday)
        || ((d == 4 || (d == 5 && w == "Monday") ||
             (d == 3 && w == "Friday")) && m == "July")
        // Labor Day (first Monday in September)
        || (d <= 7 && w == "Monday" && m == "September")
        // Thanksgiving Day (fourth Thursday in November)
        || ((d >= 22 && d <= 28) && w == "Thursday" && m == "November")
        // Christmas (Monday if Sunday or Friday if Saturday)
        || ((d == 25 || (d == 26 && w == "Monday") ||
             (d == 24 && w == "Friday")) && m == "December")
        ){
          return false;
          }
      else if (y >= 1998 && (d >= 15 && d <= 21) && w == "Monday" && m == "January")
          // Martin Luther King's birthday (third Monday in January)
          {return false;}
      else if ((y <= 1968 || (y <= 1980 && y % 4 == 0)) && m == "November"
          && d <= 7 && w == "Tuesday")
          // Presidential election days
          {return false;}
      // Special closings
      else if (// Hurricane Sandy
          (y == 2012 && m == "October" && (d == 29 || d == 30))
          // President Ford's funeral
          || (y == 2007 && m == "January" && d == 2)
          // President Reagan's funeral
          || (y == 2004 && m == "June" && d == 11)
          // September 11-14, 2001
          || (y == 2001 && m == "September" && (11 <= d && d <= 14))
          // President Nixon's funeral
          || (y == 1994 && m == "April" && d == 27)
          // Hurricane Gloria
          || (y == 1985 && m == "September" && d == 27)
          // 1977 Blackout
          || (y == 1977 && m == "July" && d == 14)
          // Funeral of former President Lyndon B. Johnson.
          || (y == 1973 && m == "January" && d == 25)
          // Funeral of former President Harry S. Truman
          || (y == 1972 && m == "December" && d == 28)
          // National Day of Participation for the lunar exploration.
          || (y == 1969 && m == "July" && d == 21)
          // Funeral of former President Eisenhower.
          || (y == 1969 && m == "March" && d == 31)
          // Closed all day - heavy snow.
          || (y == 1969 && m == "February" && d == 10)
          // Day after Independence Day.
          || (y == 1968 && m == "July" && d == 5)
          // June 12-Dec. 31, 1968
          // Four day week (closed on Wednesdays) - Paperwork Crisis
          || (y == 1968 && dd >= 163 && w == "Wednesday")
          // Day of mourning for Martin Luther King Jr.
          || (y == 1968 && m == "April" && d == 9)
          // Funeral of President Kennedy
          || (y == 1963 && m == "November" && d == 25)
          // Day before Decoration Day
          || (y == 1961 && m == "May" && d == 29)
          // Day after Christmas
          || (y == 1958 && m == "December" && d == 26)
          // Christmas Eve
          || ((y == 1954 || y == 1956 || y == 1965)
              && m == "December" && d == 24)
          ) {return false;}
      else {
            return true;
            };
  }
